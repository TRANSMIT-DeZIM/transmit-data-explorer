library(tidyverse)

tbl_count <- function(tbl, outcome_var) {
  grouping_vars <- unique(c("Rcountry", "agegr", "gender", "edu", outcome_var))

  tbl |>
    count(across(all_of(grouping_vars)), name = "value") |>
    drop_na() |>
    complete(!!!syms(grouping_vars), fill = list(value = 0L)) |>
    arrange(across(all_of(grouping_vars)))
}

str_capitalise_first <- function(string) {
  if_else(
    is.na(string),
    NA,
    paste0(str_to_upper(str_sub(string, 1, 1)), str_sub(string, 2))
  )
}

read_csv("data-raw/west-africa/SENGAM1_subset.csv") |>
  group_split(senegambia_inv, .keep = FALSE) |>
  discard_at(3) |>
  set_names(c("SEN", "GAM")) |>
  iwalk(\(data, country) {
    data |>
      write_csv(paste0("data-raw/west-africa/", country, "1_subset.csv"))
  })

fs::dir_ls("data-raw/west-africa/") |>
  head(-1) |>
  read_csv(
    id = "file",
    col_select = c(
      agegr = age_group, gender, edu = educ, employment, hhecon,
      emiglike, emiglike_region
    )
  ) |>
  mutate(
    agegr = factor(if_else(agegr == "25-35", "25-34", agegr)),
    gender = fct_relevel(if_else(gender == 0, "Male", "Female"), "Male"),
    edu = fct_relevel(if_else(startsWith(edu, "Don"), NA, edu), c(
      "Never attended school",
      "Left school without high school certificate",
      "High school certificate",
      "Vocational training",
      "Bachelor degree or higher"
    )),
    employment = fct_relevel(employment, c(
      "Not employed",
      "Civil servant",
      "Paid employment in private company",
      "Self-employed"
    )),
    hhecon = hhecon |>
      str_replace("but not for", "but not enough for") |>
      str_replace("can afford to buy( some)?", "can afford") |>
      str_extract(r"-{(not enough for|can afford)(\s\w+){1,2}}-") |>
      str_capitalise_first() |>
      fct_relevel(c(
        "Not enough for food",
        "Not enough for other basics",
        "Not enough for expensive durables",
        "Can afford expensive durables",
        "Can afford almost anything"
      )),
    emiglike = fct_relevel(emiglike, c(
      "I don't want to move at all",
      "I don't want to move",
      "Undecided about moving",
      "I want to move",
      "I really want to move"
    )),
    emiglike_region = if_else(
      emiglike_region == "Sub-Sahara Africa",
      "Sub-Saharan Africa",
      emiglike_region
    )
  ) |>
  mutate(
    Rcountry = case_when(
      str_detect(file, "GAM") ~ "Gambia",
      str_detect(file, "NIG") ~ "Nigeria",
      str_detect(file, "SEN") ~ "Senegal",
    ),
    wave = as.integer(str_extract(file, "\\d")),
    .keep = "unused",
    .before = 0L
  ) |>
  group_split(wave, .keep = FALSE) |>
  set_names(1:2) |>
  map(\(wave_data) {
    c("agegr", "gender", "edu", "employment", "hhecon", "emiglike", "emiglike_region") |>
      set_names() |>
      map(\(x) tbl_count(wave_data, x))
  }) |>
  jsonlite::write_json("src/lib/data-west-africa.json", dataframe = "columns")

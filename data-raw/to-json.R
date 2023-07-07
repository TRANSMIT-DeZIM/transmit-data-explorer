library(tidyverse)
library(jsonlite)

data_raw <- fs::dir_ls("data-raw", glob = "*.RDS") |>
  x => set_names(x, str_extract(x, "\\w+(?=\\.RDS)")) |>
  map(readRDS) |>
  map(mutate, across(
    c(Rcountry, any_of("mig_desire_cntry")),
    \(x) fct_recode(x, "Türkiye" = "Turkey")
  )) |>
  x => tibble(name = names(x), data = x)

non_outcome_counts <- data_raw$data[[1]] |>
  count(Rcountry, strata, gender, agegr, edu, wt = `_freq`)

data_raw2 <- reduce(
  c("agegr", "gender", "edu"),
  \(tbl, x) add_row(tbl, name = x, data = list(non_outcome_counts)),
  .init = data_raw
)

json_prep_meta <- read_csv("data-raw/json-prep-meta.csv", col_types = "c")

json_prep_meta |>
  inner_join(data_raw2, by = "name") |>
  pmap(\(...) {
    a <- list(...)

    if (is.factor(a$data[[a$name]]) && !is.na(a$missing_cat)) {
      a$data[[a$name]] <- fct_relevel(a$data[[a$name]], a$missing_cat, after = Inf)
    }

    if (a$name == "plan_mig") {
      a$data <- a$data |>
        filter(edu != a$missing_cat)
    }

    a$data <- a$data |>
      mutate(across(where(is.factor), fct_drop)) |>
      rename_with(\(x) case_match(x,
        a$value ~ "value",
        a$weight ~ "weight",
        .default = x
      ))

    if (a$name != "plan_mig") {
      if (a$name %in% c("agegr", "edu", "gender")) {
        a$data <- a$data |>
          complete(Rcountry, strata, gender, agegr, edu)
      } else {
        a$data <- a$data |>
          complete(Rcountry, strata, gender, agegr, edu, .data[[a$name]])
      }
    }

    a$data |>
      arrange(pick(-any_of(c("value", "weight"))))
  }) |>
  set_names(json_prep_meta$name) |>
  write_json("src/lib/data.json", dataframe = "columns", na = "null")

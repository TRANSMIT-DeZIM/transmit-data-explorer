library(tidyverse)
library(jsonlite)

str_capitalise_first <- function(string) {
  paste0(str_to_upper(str_sub(string, 1, 1)), str_sub(string, 2))
}

data_r <- c("2020", "2022") |>
  set_names() |>
  map(\(year) {
    fs::dir_ls(paste0("data-raw/mena/", year), glob = "*.RDS") |>
      x => set_names(x, str_extract(x, "\\w+(?=\\.RDS)")) |>
      map(readRDS) |>
      map(mutate, across(where(is.factor), \(x) {
        fct_relabel(x, str_capitalise_first)
      })) |>
      map(mutate, across(any_of("mig_desire_cntry"), \(x) {
        fct_recode(x, "Türkiye" = "Turkey", "Refuse" = "Refuse/don't know")
      })) |>
      enframe("name", "data")
  })

data_r$`2020` <- data_r$`2020` |>
  mutate(data = map(data, mutate,
    Rcountry = fct_recode(Rcountry, "Türkiye" = "Turkey")
  ))

data_r <- data_r |>
  map(\(year_df) {
    non_outcome_counts <- year_df$data[[1]] |>
      count(Rcountry, strata, gender, agegr, edu, wt = `_freq`)

    reduce(
      c("agegr", "gender", "edu"),
      \(tbl, x) add_row(tbl, name = x, data = list(non_outcome_counts)),
      .init = year_df
    )
  })

json_prep_meta <- read_csv("data-raw/mena-json-prep-meta.csv", col_types = "c")

data_r <- data_r |>
  map(\(year_df) {
    json_prep_meta |>
      inner_join(year_df, by = "name") |>
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

        a$data
      }) |>
      set_names(json_prep_meta$name)
  })

data_r$`2022` <- data_r$`2022` |>
  imap(\(data, name) {
    imodify(data, \(x, i) {
      if (is.factor(x)) {
        fct_relevel(x, levels(data_r$`2020`[[name]][[i]]))
      } else {
        x
      }
    })
  })

data_r |>
  map_depth(2, \(x) arrange(x, pick(-any_of(c("value", "weight"))))) |>
  write_json("src/lib/data-mena.json", dataframe = "columns", na = "null")

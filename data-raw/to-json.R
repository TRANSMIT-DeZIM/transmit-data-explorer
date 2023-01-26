library(tidyverse)
library(jsonlite)

# Utils -------------------------------------------------------------------

sum_list <- function(data,
                     facet_vars = c("Rcountry", "stratad"),
                     colour_vars = setdiff(c("agegr", "gender", "edu"), categories),
                     categories,
                     values,
                     exclude,
                     drop_missing_cat = FALSE,
                     sum_fn,
                     sum_all = !is.na(categories)) {
  if (!is.na(exclude)) {
    data <- select(data, -all_of(exclude))
  }

  map(set_names(facet_vars), \(x) {
    map(set_names(colour_vars), \(y) {
      sum_by(data, c(x, y), categories, values, drop_missing_cat, sum_fn)
    })
  })
}

sum_by <- function(data, groups, categories, values, drop_missing_cat, sum_fn) {
  stopifnot(length(groups) <= 2)
  groups_ <- syms(groups)
  categories_ <- if (is.na(categories)) NULL else sym(categories)
  values_ <- sym(values)

  data_grouped <- data |>
    with_groups(
      c(!!!groups_, !!categories_),
      summarise,
      "{values}" := do.call(sum_fn, list(!!values_))
    )

  if (length(groups) == 2) {
    data_grouped <- data_grouped |>
      pivot_wider(names_from = last(groups_), values_from = !!values_)
  }

  data_grouped <- data_grouped |>
    group_by(!!first(groups_))

  if (is.na(categories)) {
    return(list(" " = as_echarts_list(
      ungroup(data_grouped),
      categories,
      drop_missing_cat
    )))
  }

  group_names <- data_grouped |>
    group_keys() |>
    pull(first(groups_))

  data_grouped |>
    group_split(.keep = FALSE) |>
    set_names(group_names) |>
    map(
      as_echarts_list,
      categories = categories,
      drop_missing_cat = drop_missing_cat
    )
}

as_echarts_list <- function(data, categories, drop_missing_cat) {
  if (is.na(categories)) categories <- colnames(data)[1]

  xAxis <- list(type = "category", data = data[[categories]])

  if (drop_missing_cat) {
    data <- select(data, -all_of(categories), -any_of(missing_cats))
  } else {
    data <- select(data, -all_of(categories))
  }

  series <- data |>
    imap(\(values, series_name) {
      list(
        type = "bar",
        name = series_name,
        data = map(values, \(value) {
          if (series_name %in% missing_cats) {
            lst(value, itemStyle = list(color = "#e3e3e3"))
          } else {
            lst(value)
          }
        })
      )
    }) |>
    unname()

  lst(xAxis, series)
}

missing_cats <- c("missing", "refuse", "refuse/don't know")

# Data --------------------------------------------------------------------

data_raw <- fs::dir_ls("data-raw", glob = "*.RDS") |>
  x => set_names(x, str_extract(x, "\\w+(?=\\.RDS)")) |>
  map(readRDS) |>
  x => tibble(name = names(x), data = x)

non_outcome_counts <- data_raw$data[[1]] |>
  count(Rcountry, stratad, gender, agegr, edu, wt = `_freq`)

data_raw2 <- reduce(
  c("agegr", "gender", "edu"),
  \(tbl, x) add_row(tbl, name = x, data = list(non_outcome_counts)),
  .init = data_raw
)

json_prep_meta <- read_csv("data-raw/json-prep-meta.csv", col_types = "c") |>
  mutate(drop_missing_cat = name == "plan_mig") |>
  arrange(name)

json_prep_meta |>
  inner_join(data_raw2, by = "name") |>
  mutate(
    data = pmap(list(data, categories, missing_cat), \(data, categories, missing_cat) {
      if (!is.na(categories) && !is.na(missing_cat)) {
        data[[categories]] <- fct_relevel(data[[categories]], missing_cat, after = Inf)
      }
      data
    })
  ) |>
  select(-c(name, missing_cat)) |>
  pmap(sum_list) |>
  set_names(json_prep_meta$name) |>
  write_json("src/lib/data.json", auto_unbox = TRUE)

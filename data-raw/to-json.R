library(tidyverse)
library(jsonlite)

# Utils -------------------------------------------------------------------

sum_list <- function(data,
                     categories,
                     missing_cat,
                     values,
                     exclude,
                     sum_fn,
                     sum_all = !is.na(categories)) {
  if (!is.na(exclude)) {
    data <- select(data, -all_of(exclude))
  }

  ret <- setdiff(names(data), c(categories, values)) |>
    set_names() |>
    map(
      sum_by,
      data = data,
      categories = categories,
      missing_cat = missing_cat,
      values = values,
      sum_fn = sum_fn
    )

  if (sum_all) {
    c(sum_all(data, categories, missing_cat, values, sum_fn), ret)
  } else {
    ret
  }
}

sum_by <- function(data, groups, categories, missing_cat, values, sum_fn) {
  groups_ <- sym(groups)
  categories_ <- if (is.na(categories)) NULL else sym(categories)
  values_ <- sym(values)

  data_grouped <- data |>
    with_groups(
      c(!!groups_, !!categories_),
      summarise,
      "{values}" := do.call(sum_fn, list(!!values_))
    ) |>
    group_by(!!groups_)

  if (is.na(categories)) {
    return(list(" " = as_echarts_list(ungroup(data_grouped), categories, missing_cat)))
  }

  group_names <- data_grouped |>
    group_keys() |>
    pull(!!groups_)

  data_grouped |>
    group_split(.keep = FALSE) |>
    set_names(group_names) |>
    map(as_echarts_list, categories = categories, missing_cat = missing_cat)
}

sum_all <- function(data, categories, missing_cat, values, sum_fn) {
  categories_ <- sym(categories)
  values_ <- sym(values)

  sum_tbl <- data |>
    with_groups(
      !!categories_,
      summarise,
      "{values}" := do.call(sum_fn, list(!!values_))
    )

  list(all = list(" " = as_echarts_list(sum_tbl, categories, missing_cat)))
}

as_echarts_list <- function(data, categories, missing_cat = NA) {
  if (is.na(categories)) categories <- colnames(data)[1]

  xAxis <- list(type = "category", data = data[[categories]])

  series <- data |>
    select(-all_of(categories)) |>
    map(\(series) {
      list(
        type = "bar",
        data = map2(data[[categories]], series, \(category, value) {
          if (isTRUE(category == missing_cat)) {
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
  select(-name) |>
  pmap(sum_list) |>
  set_names(json_prep_meta$name) |>
  write_json("src/lib/data.json", auto_unbox = TRUE)

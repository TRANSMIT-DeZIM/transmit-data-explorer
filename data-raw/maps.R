library(tidyverse)

transmit_countries <- tibble(
  name = c("Lebanon", "Türkiye", "Nigeria", "Senegal", "The Gambia"),
  project = c(rep("MENA", 2), rep("West Africa", 3))
) |>
  mutate(iso_a3 = countrycode::countrycode(name, "country.name", "iso3c"))

all_countries_sf <- rnaturalearth::ne_countries() |>
  select(iso_a3) |>
  left_join(transmit_countries, by = "iso_a3")

common_bbox <- all_countries_sf |>
  semi_join(transmit_countries, by = "iso_a3") |>
  sf::st_bbox() |>
  as.list()

ggplot(all_countries_sf) +
  geom_sf(fill = "white", colour = "#1a5e45") +
  geom_sf_text(
    aes(label = name),
    family = "Inter",
    size = 6,
    nudge_x = 1,
    nudge_y = 0.5,
  ) +
  coord_sf(
    xlim = c(common_bbox$xmin, common_bbox$xmax),
    ylim = c(common_bbox$ymin, common_bbox$ymax)
  ) +
  theme_void()

ggsave("src/lib/assets/map-base.svg", device = svglite::svglite, width = 9, height = 6)

ggplot(all_countries_sf) +
  geom_sf(
    aes(fill = project == "MENA", colour = project == "MENA"),
    colour = "#1a5e45", show.legend = FALSE
  ) +
  scale_fill_manual(values = c("white", "#1a5e45"), na.value = "white") +
  scale_colour_manual(values = c("#1a5e45", "white"), na.value = "#1a5e45") +
  coord_sf(
    xlim = c(common_bbox$xmin, common_bbox$xmax),
    ylim = c(common_bbox$ymin, common_bbox$ymax)
  ) +
  theme_void()

ggsave("src/lib/assets/map-mena.svg", device = svglite::svglite, width = 9, height = 6)

ggplot(all_countries_sf) +
  geom_sf(
    aes(fill = project == "West Africa", colour = project == "West Africa"),
    show.legend = FALSE
  ) +
  scale_fill_manual(values = c("white", "#1a5e45"), na.value = "white") +
  scale_colour_manual(values = c("#1a5e45", "white"), na.value = "#1a5e45") +
  coord_sf(
    xlim = c(common_bbox$xmin, common_bbox$xmax),
    ylim = c(common_bbox$ymin, common_bbox$ymax)
  ) +
  theme_void()

ggsave("src/lib/assets/map-west-africa.svg", device = svglite::svglite, width = 9, height = 6)

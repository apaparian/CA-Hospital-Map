This app displays birth data by month for counties of California.

Counties are outlined. They highlight on mouseover and change color when selected. This was done for ease of navigation.

A tooltip under the pointer displays the county name. This is to avoid cluttering of names on the map.

The coloring of the map can be toggled to show a hierarchy of total population count for the selected month county. Switching months will alter the coloration to reflect the new values.
  --This was a feature I did not wish to omit, but is currently limited in map interactions. Layers dictating styles meant each county had to be added to its own layer. With additional time a solution may be reached by attaching interactions to each layer.

Hospital icons can be toggled. I thought the visual comparison could offer insight to the different population values.

While hospitals are displayed, icons will only scale on hover to avoid visual clutter, and competition with the pointer's county display, though I do think a fixed positon overlay may have been helpful.

Hospital icons, when clicked, will show their facility name. An overlay shows name, type, and address. It would be nice to find additional information to add to this panel.

The panel on the left shows the selected county and month selector to display available data for the county.

The panel on the left also shows population total and totals by facility type.Not knowing if there was some particular way to track 'Other/Unknown', I added an 'Unaccounted' field at the bottom.

The edit fields button allows for editing values. The fields are able to lock to avoid unintentional mistakes. Total Population will remain fixed unless edited by the user. The 'Unaccounted' fied tracks the unresolved difference. I was unclear as to whether 'Total Population' was tracked independently from tallying totals. The values are out of sync in the source data.

Currently the data resets on reload. The updates can be saved and used to replace the existing sourcefile. There is a backup saved to the archive.


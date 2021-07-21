var gaul = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");
var city = gaul.filter(ee.Filter.eq('ADM2_NAME','Mumbai Suburban'))

var collection = ee.ImageCollection("MODIS/006/MOD13A2")
                  .select('NDVI')
                  .filterDate('2000-02-18', '2020-09-12');
                  
function getRegions(Icol, features) {
  return Icol.map(function(image){
    var means = image.reduceRegions({
      reducer: ee.Reducer.mean(),
      collection: features.select(["ADM1_NAME","ADM2_NAME","ADM0_NAME"]),
      scale: 10
    }).filter(ee.Filter.notNull(["mean"]))
    .map(function(f) {
      return f.set('date', image.date().format())
    })
    return means
  }).flatten()
}

var ts_table = getRegions(collection.select(['NDVI']), city);
print(ts_table)
Export.table.toDrive({
  collection: ts_table,
  description: 'NDVI_Mumbai_Suburban',
  fileFormat: 'CSV'
});
import { Style, Stroke, Fill, Circle } from "ol/Style";

export const styles = {
  countyDefault: new Style({
    stroke: new Stroke({
      width: 1,
      color: [0, 100, 200, 0.8]
    }),
    fill: new Fill({
      color: [0, 100, 200, 0.4]
    })
  }),
  countyHighlight: new Style({
    stroke: new Stroke({
      width: 1,
      color: [0, 200, 100, 0.8]
    }),
    fill: new Fill({
      color: [0, 200, 100, 0.4]
    })
  }),
  countySelected: new Style({
    stroke: new Stroke({
      width: 1,
      color: [100, 0, 100, 0.8]
    }),
    fill: new Fill({
      color: [100, 0, 100, 0.4]
    })
  }),
  hospitalDefault: new Style({
    image: new Circle({
      radius: 2.5,
      stroke: new Stroke({
        width: 0.25,
        color: [250, 250, 250, 0.8]
      }),
      fill: new Fill({
        color: [200, 200, 200, 0.7]
      })
    })
  }),
  hospitalHighlight: new Style({
    image: new Circle({
      radius: 12,
      stroke: new Stroke({
        width: 1,
        color: [250, 250, 250, 1]
      }),
      fill: new Fill({
        color: [200, 200, 200, 0.8]
      })
    })
  }),
  hospitalSelected: new Style({
    image: new Circle({
      radius: 12,
      stroke: new Stroke({
        width: 1,
        color: [250, 250, 250, 1]
      }),
      fill: new Fill({
        color: [225, 225, 225, .9]
      })
    })
  }),
}
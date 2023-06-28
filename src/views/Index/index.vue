<template>
  <div class="home">
    <div id="container"></div>
  </div>
</template>

<script>
import { henan, nanjing } from '@/data/line.js'
import ComplexCustomOverlay from '@/assets/js/mapDom.js'
export default {
  name: 'Home',
  data() {
    return {
      map: null,
      mapPoints: [],
      markerClusterer: [],
      _point: null,
    }
  },
  methods: {
    initMap() {
      let BMap = window.BMap
      this.map = new BMap.Map('container')
      console.dir(this.map)
      let point = new BMap.Point(118.767413, 32.041544) // 创建点坐标
      this.map.centerAndZoom(point, 10) // 初始化地图，设置中心点坐标和地图级别
      //添加地图类型控件
      this.map.setMinZoom(3)
      this.map.setMaxZoom(14)
      this.map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
      console.log(this.map)
      // 创建地图覆盖层
      const overlay = new BMap.Overlay();

      // 设置覆盖层样式和透明度
      overlay.initialize = function (map) {
        this._map = map;
        this._div = document.createElement("div");
        this._div.style.position = "absolute";
        this._div.style.width = map.getSize().width + "px";
        this._div.style.height = map.getSize().height + "px";
        this._div.style.height = map.getSize().height + "px";
        // this._div.style.backgroundColor = "#101f35"; // 设置透明度和颜色
        this._div.style.backgroundColor = "#101f35"; // 设置透明度和颜色
        this._div.style.zIndex = "-99"; // 设置透明度和颜色
        this._div.style.opacity = "0.5"; // 设置透明度和颜色
        map.getPanes().labelPane.appendChild(this._div);
        return this._div;
      };

      let point2 = new BMap.Point(118.767413, 32.041544)
      let point3 = new BMap.Point(118.567416, 32.041544)
      // let innerHTMLBG = `<div style='width:100vw;height:100vh;background: #cccccc;position: absolute;lef:0;top:0'> hahah </div>`
      let innerHTML = `<div style='width:200px;height:200px;background: #cccccc;position: relative;z-index: 99'> 图层一 </div>`
      let innerHTML2 = `<div style='width:200px;height:200px;background: red;position: relative;z-index: 10'>图层2</div>`
      let myCompOverlay = new ComplexCustomOverlay(point2, innerHTML);
      let myCompOverlay2 = new ComplexCustomOverlay(point3, innerHTML2);
      // let myCompOverlay3 = new ComplexCustomOverlay([], innerHTMLBG);
      this.map.addOverlay(myCompOverlay);
      this.map.addOverlay(myCompOverlay2);
      // this.map.addOverlay(myCompOverlay3);

      var startPoint = new BMap.Point(118.767413, 32.041544);
      var endPoint = new BMap.Point(118.567416, 32.041544);
      var polyline = new BMap.Polyline([startPoint, endPoint], { strokeColor: "blue", strokeWeight: 3, strokeOpacity: 0.5 });
      this.map.addOverlay(polyline);
      const iconUrl2 = require('../../../public/static/images/m0.png')
      var arrowIcon = new BMap.Icon(iconUrl2, new BMap.Size(20, 30)); // 替换为你自己的箭头图标路径和尺寸
      var arrowMarker = new BMap.Marker(endPoint, { icon: arrowIcon });
      this.map.addOverlay(arrowMarker);

       // 创建聚合点标记
      const markers = [{ lng : 118.767413 , lat: 32.041544 }].map(position => {
        const point = new BMap.Point(position.lng, position.lat);
        const iconUrl = require('../../../public/static/images/m0.png'); // 替换为自定义图片的路径
        const iconSize = new BMap.Size(53, 52); // 根据实际图片尺寸设置大小
        const iconOptions = { imageSize: iconSize };
        const icon = new BMap.Icon(iconUrl, iconSize, iconOptions);
        return new BMap.Marker(point,{ icon });
      });

      // 设置聚合点选项
      const options = { gridSize: 80, maxZoom: 10 };

      // 创建聚合点对象
      var markerClusterer = new BMapLib.MarkerClusterer(this.map, {
        markers,
        styles: [{ /* 聚合点样式设置 */ }]
      });
      markerClusterer.setMaxZoom(10);
      // 监听地图缩放事件
      this.map.addEventListener('zoomend', () => {
        const currentZoom = this.map.getZoom();
        console.log(currentZoom)
        // 判断当前缩放级别是否符合显示聚合点的条件
        if (currentZoom >= 5 && currentZoom <= 10) {
          var markers = markerClusterer.getMarkers();
          console.log(markers)
          markerClusterer.showMarkers(); // 显示聚合点
        } else {
          markerClusterer.clearMarkers(); // 隐藏聚合点
        }
      });

      // 将自定义覆盖物添加到地图中
      this.map.addOverlay(overlay);
      // 添加点
      // this.addMarker()
      // 添加线
      // this.addLine()
      // 添加郑州市的轮廓线
      // this.addBorderLine()
      // 添加热力图
      // this.addheatmapOverlay()
    },
    addBorderLine() {
      let BMap = window.BMap
      let pointArr = []
      nanjing.forEach((pointDetail) => {
        var point = new BMap.Point(pointDetail.lng, pointDetail.lat) // 创建点坐标
        pointArr.push(point)
      })
      console.log(pointArr)
      let polyline = new BMap.Polyline(pointArr, {
        strokeColor: 'red',
        strokeWeight: 3,
        strokeOpacity: 1,
      })
      this.map.addOverlay(polyline)
      //  setTimeout(() => {
      //    var bd = new BMap.Boundary();
      //       console.log(bd)
      //       console.log(bd.get)
      //       bd.get('南京市', function (rs) {
      //           debugger
      //           console.log(rs)
      //           var hole = new BMap.Polygon(rs.boundaries, {
      //               fillColor: 'blue',
      //               fillOpacity: 0.2
      //           });
      //           this.map.addOverlay(hole);
      //       });
      //  }, 100);
    },
    addLine() {
      let BMap = window.BMap
      let point = new BMap.Point(113.5001, 34.60468) // 创建点坐标
      let point1 = new BMap.Point(113.7001, 34.62468) // 创建点坐标
      let polyline = new BMap.Polyline([point, point1], {
        strokeColor: 'red',
        strokeWeight: 1,
        strokeOpacity: 1,
      })
      this.map.addOverlay(polyline)
    },
    addMarker() {
      let BMap = window.BMap
      let BMapLib = window.BMapLib
      // 初始化要显示的点的坐标
      this.initPoints()
      let mapMarkers = []
      this.mapPoints.forEach((point) => {
        let marker = new BMap.Marker(point)
        mapMarkers.push(marker)
        this.map.addOverlay(marker)
      })
      let markerClusterer = new BMapLib.MarkerClusterer(this.map, {
        markers: mapMarkers,
        styles: [
          {
            url: 'm4.png',
            size: new BMap.Size(90, 90),
          },
        ],
      })
      markerClusterer.setMinClusterSize(2)
      this.markerClusterer = markerClusterer
    },
    initPoints() {
      let BMap = window.BMap
      var point = new BMap.Point(118.767413, 32.041544) // 创建点坐标
      var point1 = new BMap.Point(118.869946, 32.134454) // 创建点坐标
      var point2 = new BMap.Point(118.969946, 32.234454) // 创建点坐标
      var point3 = new BMap.Point(113.8001, 34.63468) // 创建点坐标
      var point4 = new BMap.Point(113.9001, 34.64468) // 创建点坐标
      this.mapPoints.push(point)
      this.mapPoints.push(point1)
      this.mapPoints.push(point2)
      this.mapPoints.push(point3)
      this.mapPoints.push(point4)
    },
    addheatmapOverlay() {
      var points = [
        { "lng": 118.767413, "lat": 32.041544, "count": 1000 },
        { "lng": 118.867413, "lat": 32.141544, "count": 700 },
      ];
      let heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 30 });
      this.map.addOverlay(heatmapOverlay);
      heatmapOverlay.setDataSet({ data: points, max: 1000 });
      heatmapOverlay.show();
    },
  },
  created() {
    this.$nextTick(() => {
      this.initMap()
    })
  },
}
</script>
<style lang="scss">
#container {
  height: 100vh;
  width: 100vw;
}

#container2 {
  // height: 100vh;
  // width: 100vw;
  // position: absolute;
  // left: 0;
  // top: 0;
  // background-image: url('../../../public/static/images/backimg.png');
}

#custom-div {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>

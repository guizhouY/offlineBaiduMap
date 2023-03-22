<template>
    <div class="home">
        <div id="container"></div>
    </div>
</template>

<script>
import { henan, nanjing } from '@/data/line.js'

export default {
    name: 'Home',
    data() {
        return {
            map: null,
            mapPoints: [],
            markerClusterer: [],
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
            //    setTimeout(() => {
            //      var bd = new BMap.Boundary();
            //         console.log(bd)
            //         console.log(bd.get)
            //         bd.get('南京市', function (rs) {
            //             debugger
            //             console.log(rs)
            //             var hole = new BMap.Polygon(rs.boundaries, {
            //                 fillColor: 'blue',
            //                 fillOpacity: 0.2
            //             });
            //             this.map.addOverlay(hole);
            //         });
            //    }, 100);
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
        }
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
</style>

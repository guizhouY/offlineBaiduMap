// 百度地图API功能
/* eslint-disable */

let mp = window.BMap && new BMap.Map('mapWrap');;
// 复杂的自定义覆盖物
function ComplexCustomOverlay(point, innerHTML) {
  this._point = point;
  this.innerHTML = innerHTML;
  // this._text = text;
  // this._overText = mouseoverText;
}
if (window.BMap) {
  ComplexCustomOverlay.prototype = new window.BMap.Overlay();
  ComplexCustomOverlay.prototype.initialize = function (map) {
    this._map = map;
    let div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.innerHTML = this.innerHTML

    map.getPanes().markerPane.appendChild(div);

    return div;
  }
  ComplexCustomOverlay.prototype.draw = function () {
    let map = this._map;
    let pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + "px";
    this._div.style.top = pixel.y + "px";
  }
}
export default ComplexCustomOverlay;
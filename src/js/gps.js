function 循环获取定位() {

    importPackage(android.location)
    importPackage(android.content)
    importPackage(android.widget);
    importPackage(android.graphics);
    importPackage(android.view);
    importPackage(android.text);

    function main() {
        ui.layout("参数设置", "main.xml");
        // 注意授权
        let reqRunttime = requestRuntimePermission(["android.permission.ACCESS_FINE_LOCATION", "android.permission.ACCESS_COARSE_LOCATION"], 10000)
        if (reqRunttime) {
            let gpsData = getLocation()
            let 经度 = gpsData["经度"];
            let 纬度 = gpsData["纬度"];
            let 城市位置 = gpsData["城市位置"]

            logd(经度,纬度,城市位置);

            // ui.resetUIVar();
            // ui.经度.setText(经度);
            // ui.纬度.setText(纬度);
            // ui.城市位置.setText(城市位置)
        } else {
            toast("获取定位权限失败");
        }

    }


    /**
     * @作者 Mr_老鬼 QQ:1156346325
     * @函数用途   获取GPS定位信息
     * @创建时间 1:13 2023/3/29
     * @return {JSON}
     **/
    function getLocation() {
        let locationManager = context.getSystemService(Context.LOCATION_SERVICE);
        let locations;
        let providerGPS = android.location.LocationManager.GPS_PROVIDER;
        let providerNetwork = android.location.LocationManager.NETWORK_PROVIDER;
        locations = locationManager.getLastKnownLocation(providerGPS);

        if (locations != null) {
            return {
                "经度": locations.getLongitude() + "",
                "纬度": locations.getLatitude() + "",
                "城市位置": getLocationAddress(locations)
            };
        }
        return null;
    }

    /**
     * @作者 Mr_老鬼 QQ:1156346325
     * @函数用途   地理位置转换城市位置
     * @创建时间 1:11 2023/3/29
     * @param location
     * @return string 城市位置
     **/
    function getLocationAddress(location) {
        let add = "";
        let geoCoder = new Geocoder(context, java.util.Locale.CHINESE);
        try {
            let addresses = geoCoder.getFromLocation(location.getLatitude(), location.getLongitude(), 1);
            if (addresses == null) {
                return "false";
            }
            let address = addresses.get(0);

            let countryName = address.getCountryName();//得到国家名称，比如：中国
            let locality = address.getLocality();//得到城市名称，比如：北京市
            let addressLine = "";
            for (let i = 0; address.getAddressLine(i) != null; i++) {
                addressLine = address.getAddressLine(i) + addressLine;//得到周边信息，包括街道等，i=0，得到街道名称
            }
            add = countryName + locality + addressLine;

        } catch (e) {
            add = "";
            e.printStackTrace();
        }
        return add;
    }

    main();
}
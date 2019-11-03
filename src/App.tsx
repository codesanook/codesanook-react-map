import MyMap from "./MyMap"
import React from "react"

const App = () => {
    return (
        <div>
            <MyMap
                lat={13.722183}
                lng={100.517462}
                title={'รพ. เลิดสิน'}
                content={'ถ.สีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500'}
            />
            <MyMap
                lat={13.738163}
                lng={100.532933}
                zoomLevel={14}
                title={'จุฬาลงกรณ์มหาวิทยาลัย'}
            />
        </div>
    )
}

export default App;

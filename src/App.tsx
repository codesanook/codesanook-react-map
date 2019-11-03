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
        </div>
    )
}

export default App;

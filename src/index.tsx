import React from 'react'
import ReactDOM from 'react-dom'
import MyMap from './MyMap'

ReactDOM.render(
    <MyMap
        lat={13.722183}
        lng={100.517462}
        title={'รพ. เลิดสิน'}
        content={'ถ.สีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500'}
    />,
    document.getElementById('root')
)

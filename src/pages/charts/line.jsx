import React, { useState } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'

const Line = () => {

  const [sales, setSales] = useState([5, 20, 36, 10, 10, 20])
  const [inventories, setInventories] = useState([15, 30, 46, 20, 20, 40])

  const updateCharts = (sales, inventories) => {
    sales = sales.map(sale => sale + 1)
    inventories = inventories.map(inventoriry => inventoriry - 1)
    setSales(setSales)
    setInventories(inventories)
  }
  const getOption = () => {
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'line',
          data: sales
        },
        {
          name: '库存',
          type: 'line',
          data: inventories
        }
      ]
    }
  }

  return (
    <div className="bar-container">
      <Card>
        <Button type="primary" onClick={() => updateCharts(sales, inventories)}>更新</Button>
      </Card>
      <Card title="折线图">
        <ReactEcharts option={getOption()} style={{height: 300}}/> 
      </Card>
    </div>
  )
}

export default Line
import React from 'react';
import './App.css';
import { HandPoseWorkerManager, generateDefaultHandPoseParams, generateHandPoseDefaultConfig, drawHandSkelton } from '@dannadori/handpose-worker-js'

class App extends React.Component{
  
  manager = new HandPoseWorkerManager()
  config = generateHandPoseDefaultConfig()
  params = generateDefaultHandPoseParams()

  srcCanvas = document.createElement("canvas")
  dstCanvas = document.createElement("canvas")

  componentDidMount = () =>{
      //添加到dom树上
    document.getRootNode().lastChild!.appendChild(this.srcCanvas)
    document.getRootNode().lastChild!.appendChild(this.dstCanvas)
    // 获取图片element
    const srcImage = document.createElement("img")
    srcImage.onload = () =>{

      this.manager.init(this.config)
      
      
      .then(()=>{
        this.srcCanvas.getContext("2d")!.drawImage(
          srcImage, 0, 0, this.srcCanvas.width, this.dstCanvas.height)
          
        return this.manager.predict(this.srcCanvas, this.params)
      })
      
      
      
      
      .then((res)=>{
        const imageData = drawHandSkelton(this.srcCanvas, res, this.params)
        console.log(res)
        this.dstCanvas.getContext("2d")!.putImageData(imageData, 0, 0)
      })


    }
    srcImage.src = "./srcImage.jpg"
  }

  render = ()=>{
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
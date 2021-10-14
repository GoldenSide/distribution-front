import QRcode from "qrcode";

export function downLoadImg(name: string, className: string, src:any) {
    let fileName = name + ".png"
    let img = document
        .getElementById("qrcode")
        ?.getElementsByClassName(className)[0];
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", src);
    downloadLink.setAttribute("download", fileName);
    downloadLink.click();
}

export function imageToCanvas(url:string) {
    return new Promise((resolve, reject) => {
        // 用于存储导出的海报图片
        var qr_code = "" 
        // 创建canvas 用于导出海报
        var maiCanvas = document.createElement("canvas")
        maiCanvas.width = 750
        maiCanvas.height = 1334
        maiCanvas.setAttribute("id", "myCanvas")
        var context = maiCanvas.getContext("2d");
        
        // 创建canvas 用生成海报
        var er_canvas = document.createElement("canvas")
        er_canvas.width = 140
        er_canvas.height = 140
        er_canvas.setAttribute("id", "er_canvas")
        QRcode.toCanvas(er_canvas, url, error=>{
            if(error) {
                console.log("海报生成失败！")
            }
        })
        qr_code = er_canvas.toDataURL();

        
        // 将图片按序写入canvas
        var img = new Image()
        img.src = "./img/poster.jpg"
        //图片加载完后，将其显示在canvas中
        img.onload = function(){
            context.drawImage(this, 0, 0)
            var qr_img = new Image()
            qr_img.src = qr_code
            qr_img.onload = function(){
                context.drawImage(this, 488, 1048, 140, 140)
                var logo_img = new Image()
                logo_img.src = "./img/logo.png"
                logo_img.onload = function(){
                    context.drawImage(this, 544, 1104, 28, 28)
                    var img = maiCanvas.toDataURL('image/jpg');
                    if(img){
                        resolve(img)
                    } else {
                        reject()
                    }
                    
                }
            }
        }  
    })
}

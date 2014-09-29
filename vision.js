      var valuesr,valuesb,valuesg,alphas;
      
      function initMemory(imageObj)
      {
        valuesr = new Array(imageObj.height);
        valuesg = new Array(imageObj.height);
        valuesb = new Array(imageObj.height);
        
        alphas = new Array(imageObj.height);

        for (var i = 0; i < imageObj.height; i++) 
        {
          valuesr[i] = new Array(imageObj.width);
          valuesg[i] = new Array(imageObj.width);
          valuesb[i] = new Array(imageObj.width);
          alphas[i] = new Array(imageObj.width);
        }
      }

      function putImage(imageObj,canvas,imageX,imageY)
      {
        canvas.width=imageObj.width;
        canvas.height=imageObj.height;
        imageObj.onload=function(){
        var context=canvas.getContext('2d');
        context.drawImage(imageObj,imageX,imageY);
        var imageData=context.getImageData(imageX,imageY,imageObj.width,imageObj.height);
        context.putImageData(imageData,imageX,imageY);}
      }

      function initIntensities(imageObj)
      {

       initMemory(imageObj);
       var canvas=document.createElement('canvas');
       canvas.width=imageObj.width;
       canvas.height=imageObj.height;
       var context=canvas.getContext('2d');
       context.drawImage(imageObj,0,0);
       imageData=context.getImageData(0,0,imageObj.width,imageObj.height);
       var data = imageData.data;
       var imageHeight=imageObj.height;
       var imageWidth=imageObj.width;


       for(var y = 0; y < imageHeight; y++) 
        for(var x = 0; x < imageWidth; x++) 
        {
          var ind=((imageWidth * y) + x) * 4;
          valuesr[y][x] = data[ind];
          valuesg[y][x] = data[ind+1];
          valuesb[y][x] = data[ind+2];
          alphas[y][x] = data[ind+3];
          //document.write(alphas[y][x]+"<br>");
        }
      }



      function applyFilter(imageObj,filter)
      {
      	var tempImage = document.createElement('img') ;
      	tempImage.src = imageObj.src;

        tempImage.onload = function() 
        {
          initIntensities(tempImage) ;
          var cc=document.createElement('canvas');
          cc.height = tempImage.height ;
          cc.width = tempImage.width ;
          var context = cc.getContext('2d');
          context.drawImage(tempImage, 0, 0,tempImage.width,tempImage.height);
          var Imdata = context.getImageData(0,0,tempImage.width,tempImage.height) ;
          var data = Imdata.data ;
          var n = filter.length ;
          var k=(n-1)/2;
          for (i = 0  ;i < tempImage.height ; ++i)
          {
            for (j = 0 ; j < tempImage.width ; ++j)
            {
              var ind=((tempImage.width*i )+ j)*4;
              sumr=0,sumg=0,sumb=0;

              for (u=0;u<n;u++)
              {
                for(v=0;v<n;v++)
                {
                  if (i+u-k>=0 && j+v-k>=0 && i+u-k<tempImage.height && j+v-k<tempImage.width)
                  {
                    sumr+= valuesr[i+(u-k)][j+(v-k)] * filter[u][v] ;
                    sumg+= valuesg[i+(u-k)][j+(v-k)] * filter[u][v] ;
                    sumb+= valuesb[i+(u-k)][j+(v-k)] * filter[u][v] ;
                  }
                }
              }
              data[ind]=sumr;
              data[ind+1]=sumg;
              data[ind+2]=sumb;
              //alpha is the opacity value in the range of 0-255
              data[ind+3]=alphas[i][j];
            }
          }
          context.putImageData(Imdata,0,0) ;
          imageObj.src = cc.toDataURL() ;

        }
      }


      function getFilteredCanvas(imageObj,filter,callback)
      {
      	var tempImage = document.createElement('img') ;
      	tempImage.src = imageObj.src ;
        tempImage.onload = function() 
        {
          initializeValues(tempImage) ;
          drawImage(tempImage) ;
          var cc=document.createElement('canvas');
          cc.height = tempImage.height ;
          cc.width = tempImage.width ;
          var context = cc.getContext('2d');
          context.drawImage(tempImage, 0, 0,tempImage.width,tempImage.height);
          var Imdata = context.getImageData(0,0,tempImage.width,tempImage.height) ;
          var data = Imdata.data ;
          var n = filter.length ;
          var k=(n-1)/2;
          for (i = 0  ;i < tempImage.height ; ++i)
          {
            for (j = 0 ; j < tempImage.width ; ++j)
            {
              var ind=((tempImage.width*i )+ j)*4;
              sumr=0,sumg=0,sumb=0;

              for (u=0;u<n;u++)
              {
                for(v=0;v<n;v++)
                {
                  if (i+u-k>=0 && j+v-k>=0 && i+u-k<tempImage.height && j+v-k<tempImage.width)
                  {
                    sumr+= valuesr[i+(u-k)][j+(v-k)] * filter[u][v] ;
                    sumg+= valuesg[i+(u-k)][j+(v-k)] * filter[u][v] ;
                    sumb+= valuesb[i+(u-k)][j+(v-k)] * filter[u][v] ;
                  }
                }
              }
              data[ind]=sumr;
              data[ind+1]=sumg;
              data[ind+2]=sumb;
              //alpha is the opacity value in the range of 0-255
              data[ind+3]=alphas[i][j];
            }
          }
          context.putImageData(Imdata,0,0) ;
      		callback(cc) ;
        }
      }

     function getConvolvedCanvas(imageObj,filter,callback)
     {
      	var tempImage = document.createElement('img') ;
      	tempImage.src = imageObj.src ;
        tempImage.onload = function() 
        {
          initializeValues(tempImage) ;
          drawImage(tempImage) ;
          var cc=document.createElement('canvas');
          cc.height = tempImage.height ;
          cc.width = tempImage.width ;
          var context = cc.getContext('2d');
          context.drawImage(tempImage, 0, 0,tempImage.width,tempImage.height);
          var Imdata = context.getImageData(0,0,tempImage.width,tempImage.height) ;
          var data = Imdata.data ;
          var n = filter.length ;
          var k=(n-1)/2;
          for (i = 0  ;i < tempImage.height ; ++i)
          {
            for (j = 0 ; j < tempImage.width ; ++j)
            {
              var ind=((tempImage.width*i )+ j)*4;
              sumr=0,sumg=0,sumb=0;

              for (u=0;u<n;u++)
              {
                for(v=0;v<n;v++)
                {
                  if (i-(u-k)>=0 && j-(v-k)>=0 && i-(u-k)<tempImage.height && j-(v-k)<tempImage.width)
                  {
                    sumr+= valuesr[i-(u-k)][j-(v-k)] * filter[u][v] ;
                    sumg+= valuesg[i-(u-k)][j-(v-k)] * filter[u][v] ;
                    sumb+= valuesb[i-(u-k)][j-(v-k)] * filter[u][v] ;
                  }
                }
              }
              data[ind]=sumr;
              data[ind+1]=sumg;
              data[ind+2]=sumb;
              //alpha is the opacity value in the range of 0-255
              data[ind+3]=alphas[i][j];
            }
          }
          context.putImageData(Imdata,0,0) ;
		      callback(cc) ;
        }
     }

     function getGradMagnitude(imageObj,callback)
      {
        filterx = [[-1,0,1],[-1,0,1],[-1,0,1]] ;
        filtery = [[-1,-1,-1],[0,0,0],[1,1,1]] ;
        var tempImage = document.createElement('img') ;
        tempImage.src = imageObj.src ;
        tempImage.onload = function() 
        {
          initializeValues(tempImage) ;
          drawImage(tempImage) ;
          var cc=document.createElement('canvas');
          cc.height = tempImage.height ;
          cc.width = tempImage.width ;
          var context = cc.getContext('2d');
          context.drawImage(tempImage, 0, 0,tempImage.width,tempImage.height);
          var Imdata = context.getImageData(0,0,tempImage.width,tempImage.height) ;
          var data = Imdata.data ;
          var n = filterx.length ;
          var k=(n-1)/2;
          for (i = 0  ;i < tempImage.height ; ++i)
          {
            for (j = 0 ; j < tempImage.width ; ++j)
            {
              var ind=((tempImage.width*i )+ j)*4;
              sumrx=0,sumgx=0,sumbx=0;
              sumry=0,sumgy=0,sumby=0;
              for (u=0;u<n;u++)
              {
                for(v=0;v<n;v++)
                {
                  if (i+u-k>=0 && j+v-k>=0 && i+u-k<tempImage.height && j+v-k<tempImage.width)
                  {
                    sumrx+= valuesr[i+(u-k)][j+(v-k)] * filterx[u][v] ;
                    sumry+= valuesr[i+(u-k)][j+(v-k)] * filtery[u][v] ;
                    sumgx+= valuesg[i+(u-k)][j+(v-k)] * filterx[u][v] ;
                    sumgy+= valuesg[i+(u-k)][j+(v-k)] * filtery[u][v] ;
                    sumbx+= valuesb[i+(u-k)][j+(v-k)] * filterx[u][v] ;
                    sumby+= valuesb[i+(u-k)][j+(v-k)] * filtery[u][v] ;
                  }
                }
              }
              var current = Math.sqrt(sumrx*sumrx + sumry*sumry) ;
              data[ind]= current > 60 ? current : 0 ;
              current = Math.sqrt(sumgx*sumgx + sumgy*sumgy) ;
              data[ind+1]= current > 60 ? current : 0 ;
              current = Math.sqrt(sumbx*sumgx + sumgy*sumgy) ;
              data[ind+2]= current > 60 ? current : 0 ;
              //alpha is the opacity value in the range of 0-255
              data[ind+3]=alphas[i][j];
            }
          }
          context.putImageData(Imdata,0,0) ;
          callback(cc) ;
        }
      }

      function get_edge(imageObj,callback)
      {
        filterx = [[-1,0,1],[-1,0,1],[-1,0,1]] ;
        filtery = [[-1,-1,-1],[0,0,0],[1,1,1]] ;
        var tempImage = document.createElement('img') ;
        tempImage.src = imageObj.src ;
        tempImage.onload = function() 
        {
          initializeValues(tempImage) ;
          drawImage(tempImage) ;
          var cc=document.createElement('canvas');
          cc.height = tempImage.height ;
          cc.width = tempImage.width ;
          var context = cc.getContext('2d');
          context.drawImage(tempImage, 0, 0,tempImage.width,tempImage.height);
          var Imdata = context.getImageData(0,0,tempImage.width,tempImage.height) ;
          var data = Imdata.data ;
          var n = filterx.length ;
          var k=(n-1)/2;
          for (i = 0  ;i < tempImage.height ; ++i)
          {
            for (j = 0 ; j < tempImage.width ; ++j)
            {
              var ind=((tempImage.width*i )+ j)*4;
              sumrx=0,sumgx=0,sumbx=0;
              sumry=0,sumgy=0,sumby=0;
              for (u=0;u<n;u++)
              {
                for(v=0;v<n;v++)
                {
                  if (i+u-k>=0 && j+v-k>=0 && i+u-k<tempImage.height && j+v-k<tempImage.width)
                  {
                    sumrx+= valuesr[i+(u-k)][j+(v-k)] * filterx[u][v] ;
                    sumry+= valuesr[i+(u-k)][j+(v-k)] * filtery[u][v] ;
                    sumgx+= valuesg[i+(u-k)][j+(v-k)] * filterx[u][v] ;
                    sumgy+= valuesg[i+(u-k)][j+(v-k)] * filtery[u][v] ;
                    sumbx+= valuesb[i+(u-k)][j+(v-k)] * filterx[u][v] ;
                    sumby+= valuesb[i+(u-k)][j+(v-k)] * filtery[u][v] ;
                  }
                }
              }
              var current = Math.sqrt(sumrx*sumrx + sumry*sumry) ;
              data[ind]= current > 60 ? current : 0 ;
              current = Math.sqrt(sumgx*sumgx + sumgy*sumgy) ;
              data[ind+1]= current > 60 ? current : 0 ;
              current = Math.sqrt(sumbx*sumgx + sumgy*sumgy) ;
              data[ind+2]= current > 60 ? current : 0 ;
              //alpha is the opacity value in the range of 0-255
              data[ind+3]=alphas[i][j];
            }
          }
          context.putImageData(Imdata,0,0) ;
          callback(cc) ;
        }
      }
const db = firebase.firestore();
var loading;
var display_subjects=document.getElementById('display-subjects');
var display_professors=document.getElementById("display-subjects-professors");
var display_viewer=document.getElementById('viewer');
var display_chapters=document.getElementById("display-chapters");
var rw=document.getElementById("rw");
var rw2=document.getElementById("rw2");
var header_display=document.getElementById('heading_display');
var static_sub1=document.getElementById('static1');
var static_sub2=document.getElementById('static2');
var static_para=document.getElementById('more_p');
var static_para2=document.getElementById('less_p');
var nav2=document.getElementById('nav2');
var sub_chng=document.getElementById('sub_chng');
var prof_chng=document.getElementById('prof_chng');
let remove=document.getElementById('txt');
var data_list=document.getElementById('data-sub');
var sbox=document.getElementById('sbox');
var rw3=document.getElementById('rw3');
let choice_material=document.getElementById('choice_material');
 
 document.getElementById('prev_year').addEventListener('click',function(){
  swal(`Currently only subject notes feature and reviews is fully implemented and working and connected to backend. 😅`);
 })
 document.getElementById('quiz').addEventListener('click',function(){
  swal(`Currently only subject notes feature and reviews is fully implemented and working and connected to backend. 😅`);
 })





function getSearch(){

  

    

    var flag=0;
    var val = sbox.value;
    for(var i=0;i<arr.length;i++){

      if(arr[i]===val){


       
        $('.more').hide();
        $('.hide').show();
        $('.aboutus').hide();
      $('.caro').hide();
      $('.rateus').hide();
      $('.abtus').hide();
      $('.rtus').hide();
      $('.dev_cr').hide();
     
		  $('.legecy').hide();
		  $('#heading_display').css("margin-top","100px");

      divArrangement(display_professors);

        let id=val;
        flag=1;
        
        document.querySelector('[data-id='+CSS.escape(id)+']').click();
        break;
        

      }
      else{

        

      }

    }

    if(flag==0){

      swal({
        title: "Choose a subject that we have from dropdown ! 🙄",
        text: "",
        icon: "info",
        button: "Aww yiss!",
      });


    }



}



var imgArray=new Array(21);
// for(var i=1;i<=21;i++)
// {
//   imgArray[i-1]='sub_img/'+i+'.png';


// }
imgArray[0]="https://i.pinimg.com/originals/06/46/45/064645ae0c8339fe94a6363f043a45d6.jpg";
imgArray[1]="http://3.bp.blogspot.com/-11wNEvNBte0/VaztOh8tNsI/AAAAAAAANxA/XZtDzzssJno/s1600/hd-desktop-technology-wallpaper-backgrounds-for-download.jpg";
imgArray[2]="https://images04.military.com/sites/default/files/2017-11/computer-chip-tech.jpg";
imgArray[3]="http://educationcareerarticles.com/wp-content/uploads/2014/01/Computer-Technology.jpg";
imgArray[4]="https://wonderfulengineering.com/wp-content/uploads/2014/01/Technology-Wallpaper-1.jpg";
imgArray[5]="https://tr1.cbsistatic.com/hub/i/r/2017/02/09/c567a6a6-f4ca-4a3e-8d48-e37ec9a4ec82/thumbnail/768x432/c6ca14c3e44d2ac7c851e84fde533a6c/bigdataistock-496699834allanswart.jpg";
imgArray[6]="https://us.123rf.com/450wm/number168/number1681509/number168150900086/45113861-stock-vector-vector-illustration-white-gear-wheel-on-circuit-board-hi-tech-digital-technology-and-engineering-dig.jpg?ver=6";
imgArray[7]="https://www.iiconsortium.org/images/Thumbnail-Reston17Public.jpg";
imgArray[8]="https://png.pngtree.com/thumb_back/fw800/back_pic/03/60/45/0457a5d63980334.jpg";
imgArray[9]="https://wonderfulengineering.com/wp-content/uploads/2014/01/Technology-Wallpapers-10.jpg";
imgArray[10]="https://mk0qualifymek4mxlihe.kinstacdn.com/wp-content/uploads/post-3.jpg";
imgArray[11]="https://i.pinimg.com/originals/89/ae/b5/89aeb5c2b709c61d50b0338070a51181.jpg";
imgArray[12]="https://wallpapercave.com/wp/tkOMoUU.jpg";
imgArray[13]="https://wallpapermemory.com/uploads/648/circuit-wallpaper-1366x768-laptop-89587.jpg";
imgArray[14]="https://www.kut.ac.ir/public/uploads/educational_groups/750xauto-1580623798rFTA1TzgAClSWL7L9bMHTTPpH6NkBs5hgqWsD7LX.jpeg";
imgArray[15]="https://th.bing.com/th/id/OIP.6hqoSQOnux99uXY5XHZlWwHaD8?w=340&h=181&c=7&o=5&dpr=1.25&pid=1.7";
imgArray[16]="https://www.thegreatcoursesdaily.com/wp-content/uploads/2017/03/Coding-Featured-Image-Thumb.jpg";
imgArray[17]="https://wallpapercave.com/wp/U6pkgpd.jpg";
imgArray[18]="https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2019/03/16/35e584f4-46f3-11e9-b5dc-9921d5eb8a6d_image_hires_194000.JPG?itok=nVKrf1-W&v=1552736407";
imgArray[19]="http://www.peak-ds.com/wp-content/uploads/2012/04/binary-code-image.jpg";
imgArray[20]="https://skillshipfoundation.com/wp-home2/2020/01/learn-to-code.jpg";
imgArray[21]="https://cdn.pixabay.com/photo/2016/04/27/06/49/monitor-1356059_960_720.jpg";
imgArray[22]="https://i.pinimg.com/originals/b1/32/cb/b132cb6e562fef08f3e9457f1b750f38.jpg";
imgArray[23]="https://wallpapercave.com/wp/wp2556806.jpg";
imgArray[24]="https://i.pinimg.com/originals/a3/40/13/a340132be1d3f8398429d7ede184e92e.jpg";
imgArray[25]="https://images.wallpaperscraft.com/image/hologram_pattern_glow_145559_2560x1600.jpg";
imgArray[26]="https://singularityhub.com/wp-content/uploads/2017/02/holograms-arent-science-fiction-anymore-31-1068x601.jpg";
imgArray[27]="https://image.freepik.com/free-photo/3d-abstract-techno-background-with-connecting-lines-dots_1048-10158.jpg";
imgArray[28]="https://i.pinimg.com/originals/f9/5f/be/f95fbe63d2918d9e02f5a194691e9e21.jpg";
imgArray[29]="https://image.freepik.com/free-vector/abstract-technology-concept-map-dot-digital-link-binary-hi-tech-blue-background_36402-87.jpg";
imgArray[30]="https://i.pinimg.com/originals/40/ce/e2/40cee2ae407de99af49bea4ff771bcff.jpg";
imgArray[31]="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
imgArray[32]="https://images.unsplash.com/photo-1496065187959-7f07b8353c55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
imgArray[33]="https://wem.technology/wp-content/uploads/2016/09/Fotolia_107419345_S.jpg";
imgArray[34]="https://wonderfulengineering.com/wp-content/uploads/2014/01/Technology-Wallpaper-10.jpg";
imgArray[35]="https://image.freepik.com/free-vector/abstract-realistic-technology-particle-background_52683-33063.jpg";
imgArray[36]="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/cosmic-eye-mark-irvine.jpg";
imgArray[37]="https://png.pngtree.com/thumb_back/fh260/background/20190529/pngtree-the-background-of-sense-of-science-and-technology-in-information-technology-image_117255.jpg";
imgArray[38]="https://cdn.labmanager.com/assets/articleNo/5830/iImg/13534/542a158a-e967-4f9e-ab9d-52962ea4edcf-nov28-2017-duke-istock-news-quantumcomputing-640x360.jpg";
imgArray[39]="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQi2VD0CZY2u_3UsJ0QI1Vl2ZaY4IDj0EHPzg&usqp=CAU";
imgArray[40]="";
imgArray[41]="";
imgArray[42]="";
imgArray[43]="";
imgArray[44]="";
imgArray[45]="";


$(".disbl_download").click(function(){

  swal({
    title: "Currently disabled 😅 ",
    text: "We have currently disabled download...If u want us to allow it in update then do mail us. We read all mails 😊",
    icon: "error",
    button: "Ok",
  });

});

sub_chng.addEventListener('click', function(){

  header_display.textContent="SUBJECTS";
  display_subjects.style.display="block";
  display_professors.style.display="none";
  display_chapters.style.display="none";
  display_viewer.style.display="none";
  divArrangement(display_subjects);//new added

  
 // $('#static1').show();
 // $('#static2').show();

  static_para.style.display="none";
  static_para2.style.display="block";
  nav2.style.display="none";
 // $('.home').click();
 $('.hide').show();
  
  
  


});

prof_chng.addEventListener('click',function(){

  header_display.textContent="Choose Professor";
  display_subjects.style.display="none";
  display_professors.style.display="block";
  display_chapters.style.display="none";
  display_viewer.style.display="none";

 
  static_para.style.display="none";
  static_para2.style.display="none";
  nav2.style.display="block";
  sub_chng.style.display="inline";
  prof_chng.style.display="none";
  divArrangement(display_professors);//new added
  




})


function divArrangement(div_I_need){

    choice_material.style.display="None";
    display_subjects.style.display="none";
    display_professors.style.display="none";
    display_chapters.style.display="none";
    display_viewer.style.display="none";
    div_I_need.style.display="block";
  
}

function setSubDisplay(sub_name){

  header_display.textContent=sub_name;

  
  $('#static1').hide();
  $('#static2').hide();

  static_para.style.display="none";
  static_para2.style.display="none";
  nav2.style.display="block";
  sub_chng.style.display="inline";
  prof_chng.style.display="none";

}

function setProfDisplay(prof_name){

  header_display.textContent=prof_name;

  
  $('#static1').hide();
  $('#static2').hide();

  static_para.style.display="none";
  static_para2.style.display="none";
  nav2.style.display="block";
  sub_chng.style.display="inline";
  prof_chng.style.display="inline";

}


function renderDoc(doc){

  
    
      let ele=document.createElement('a');
    ele.className='card-title text-dark m-auto';
    ele.setAttribute('data-id',doc.id);
    ele.textContent=doc.id.split('-')[1];
     ele.href="#";

     

    
    var random=Math.floor(Math.random() * (39) - 0 );
    
     
      var img= document.createElement('div');
      img.style.height="200px";
     img.style.width="100%";
     img.style.paddingTop="auto";
     
      
      img.style.backgroundImage= "url("+imgArray[random]+")"; 
      img.style.backgroundSize="cover";
     
      
      
     
     img.className="card-img-top text-center text-white align-middle font-weight-bold";
     
     img.alt="Image laod failed";
     img.border="2 px solid red";
     

     

     
     
     
  
      
    
    let el1=document.createElement('div');
    el1.className='col-lg-3 col-md-3 col-sm-6 col-xs-12';
    let el2=document.createElement('div');
    el2.className='card my-3';

    el2.appendChild(img);

    
    let el4=document.createElement('div');
    el4.className='card-body myNewDivHeight sub text-center text-capitalize d-flex';
    //el4.style.height='135px';
    el4.appendChild(ele);
    el2.appendChild(el4);
    el1.appendChild(el2);
    
    rw.appendChild(el1);
    display_subjects.appendChild(rw);

   ele.addEventListener('click', function(){
    let txt=document.createTextNode("Loading Professors....."+"😉");
    
    display_professors.appendChild(txt);
    
    let sub_name=ele.getAttribute('data-id');
    
    setSubDisplay('Professors for '+(sub_name.split('-')[1]));
    display_subjects.style.display="none";
    display_professors.style.display="block";
    
    
    rw2.innerHTML="";
   
    db.collection('Subjects').doc(sub_name).get().then(function(doc){

        //console.log(doc.data());

        let object=Object.values(doc.data());
        
        
        
        for(i=0;i<object.length;i++){
            
            //console.log(object[i]);
              let ele_professor=document.createElement('a');
    ele_professor.className='card-title text-dark';
    ele_professor.setAttribute('data-id',sub_name+'/'+object[i]+'/');
    ele_professor.textContent=object[i];
    ele_professor.href="#";
    
    let el5=document.createElement('div');
    el5.className='col-lg-12';
    let el6=document.createElement('div');
    el6.className='card my-3';
    let el7=document.createElement('div');
    el7.className='card-header';
    el6.appendChild(el7);
    let el8=document.createElement('div');
    el8.className='card-body sub text-center text-capitalize';
    el8.appendChild(ele_professor);
    el6.appendChild(el8);
    el5.appendChild(el6);
            
            rw2.appendChild(el5);
           
           txt.remove();
           display_professors.appendChild(rw2);
    
            
            //console.log(ele_professor.getAttribute('data-id'));
            
            //console.log(key);
            //console.log(object.valueOf(key));
            //ele_professor.href="#";
            //display_professors.appendChild(ele_professor);
            //document.body.appendChild(ele_professor);

            ele_professor.addEventListener('click',function(){
              setProfDisplay("Course Material");
              divArrangement(choice_material);

              // video_links.addEventListener('click',function(){

              //   var data="Video lectures ( "+ele_professor.getAttribute('data-id').split('/')[0].split('-')[1]+" ) by : "+ele_professor.getAttribute('data-id').split('/')[1];
              //   //setProfDisplay(data);
              //   var display_content_video=document.getElementById('video-content-div');
              //   display_content_video.innerHTML="";


              // })


              let pdf_button=document.getElementById('pdf');
              pdf_button.addEventListener('click',function(){

                var data="Notes ( "+ele_professor.getAttribute('data-id').split('/')[0].split('-')[1]+" ) by : "+ele_professor.getAttribute('data-id').split('/')[1];
                
                rw3.innerHTML="";
                setProfDisplay(data);
                divArrangement(display_chapters);
                let txt2=document.createTextNode("Loading Chapters....."+"😉");
                display_chapters.appendChild(txt2);
               // console.log("Inner bhtml" +display_chapters.innerHTML);
               // console.log("txt2 " +txt2+txt2.parentNode);
                  
                  
  
                 
                 
  
                  var link=ele_professor.getAttribute('data-id');
                  //console.log(ele_professor.getAttribute('data-id'));
                  var storage = firebase.storage().ref(ele_professor.getAttribute('data-id'));
                  storage.listAll().then(function(res) {
  
                   
                    display_chapters.removeChild(txt2);
                    txt2.remove();
                      
                     
                      res.items.forEach(function(itemRef) {
  
                        //console.log("Run");
                        
                       // console.log('Item '+itemRef);
                        var str=itemRef.toString();
                       
                        var ele=document.createElement('a');
                        
                        ele.textContent=str.split(ele_professor.getAttribute('data-id'))[1];
                        
                        ele.href="#";
                       
                       ele.className="'card-title text-dark";
  
  
  
                      let col=document.createElement('div');
                      col.className='col-lg-12';
                      let card=document.createElement('div');
                      card.className='card my-3';
                      let header=document.createElement('div');
                      header.className='card-header';
                      card.appendChild(header);
                      let body=document.createElement('div');
                      body.className='card-body sub text-center text-capitalize';
                      body.appendChild(ele);
                      card.appendChild(body);
                      col.appendChild(card);
  
                        
                       rw3.appendChild(col);
  
                        ele.addEventListener('click',function(){
  
                          analytics.logEvent(sub_name, { prof_name: ele_professor.textContent , chapter: ele.textContent});//Logged in subject
                          //  console.log(sub_name+"::"+ele_professor.textContent+"::"+ele.textContent),
  
                            divArrangement(display_viewer);
                              
                              loading=document.createElement('p');
                              loading.class="font-weight-light text-center mt-5 w-100";
                              loading.textContent='Loading Notes....'+"😉";
                              
                              display_viewer.appendChild(loading);
                              
                              var url= storage.child(ele.textContent).getDownloadURL().then(function(url) {
                                  
                                  load(url);
  
                                }).catch(function(error) {
  
                                  swal({
                                    title: "Oops ! Some error occurred ! 🙄",
                                    text: "Try reloading this webpage and do mail us if problem persists",
                                    icon: "error",
                                    button: "Ok",
                                  });
                          
                                  
                                  console.log('Fetching '+error);
                                });
                                
                                
  
                             
  
  
  
                        });
  
                        
                        
  
                      });
                    }).catch(function(error) {
  
                      swal({
                        title: "Oops ! Some error occurred ! 🙄",
                        text: "Try reloading this webpage and do mail us if problem persists",
                        icon: "error",
                        button: "Ok",
                      });
                      
                      console.log(error);
                    });
                   
                   
                    
                  
  
              })
            })
            
         }
        
        });
            
    });
    
   

}

var arr=new Array();
db.collection('Subjects').get().then((snapshot)=> {
    
    let txtnode=document.createTextNode("Loading Subjects....."+String.fromCodePoint(0x1F354));
    display_subjects.appendChild(txtnode);
   
    snapshot.docs.forEach(doc =>{
        arr.push(doc.id);

        
        renderDoc(doc);
        let l=document.createElement('option');
        l.value=doc.id;
        
        data_list.appendChild(l);

        
    })
    
    txtnode.remove();
    
  

}).catch(function(error) {
    
    display_subjects.innerHTML="Sorry, Some error occurred ! Do mail us about it so that we can know..";
});



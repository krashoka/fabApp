"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6043],{6043:(T,u,r)=>{r.r(u),r.d(u,{ItemInfoPageModule:()=>_});var g=r(6895),h=r(433),c=r(4556),t=r(8256);let b=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[g.ez]}),n})();var f=r(1407),P=r(529),M=r(2032),C=r(1481);let v=(()=>{class n{constructor(e){this.sanitizer=e}transform(e,...l){return this.sanitizer.bypassSecurityTrustHtml(e)}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(C.H7,16))},n.\u0275pipe=t.Yjl({name:"safeHtml",type:n,pure:!0}),n})();function y(n,a){if(1&n&&(t.TgZ(0,"div"),t._UZ(1,"div",17),t.ALo(2,"safeHtml"),t.qZA()),2&n){const e=a.$implicit;t.xp6(1),t.Q6J("innerHTML",t.lcZ(2,1,e),t.oJD)}}const O=[{path:"",component:(()=>{class n{constructor(e,l,m){this.router=e,this.navCtrl=l,this.http=m,this.items=[],this.http.get("https://specbits.com/class2/fab/newform").subscribe(o=>{console.log(o);const s=o.reduce((i,d,p)=>(Array.isArray(d)&&i.push(p),i),[]);console.log(s);for(let i=0;i<o.length;i++)if("select"==o[i].type){console.log(i);for(let d=0;d<s.length;d++){let p=[];if(o[i].form_field_id==o[s[d]][0].form_fields_id){for(let x=0;x<o[s[d]].length;x++)p.push("<option>"+o[s[d]][x].value+"</option>");this.items.push('<p style="font-size:18px; font-weight:700">'+o[i].label+'</p><select style="width:100%;border: 1px solid #d9d9d9; font-size: 16px; padding:0 5px; height: 40px; font-weight: normal; margin-bottom: 20px; border-radius: 5px" '+o[i].label+"><option>Select</option>"+p+"</select>")}}}else"input"==o[i].type?this.items.push('<p style="font-size:18px; font-weight:700">'+o[i].label+'</p><ion-input type="'+o[i].type+'"  placeholder="'+o[i].label+'" style="width:100%;border: 1px solid #d9d9d9; font-size: 16px; font-weight: normal; margin-bottom: 20px; border-radius: 5px"/>'):"checkbox"==o[i].type&&this.items.push('<div style="display:flex; align-items:center; gap:10px; margin-bottom: 15px; font-weight:normal; font-size: 16px"><ion-checkbox slot="start"></ion-checkbox><ion-label>'+o[i].label+"</ion-label></div>");console.log(o)},o=>{console.log("ErrorMessage: ",o)})}goToCommercialAds(){this.router.navigate(["commercialads"])}goToStickyAds(){this.router.navigate(["products"])}goToHome(){this.router.navigate(["home"])}goBack(){this.navCtrl.back()}goToUploadImage(){this.router.navigate(["uploadimage-page"])}goToAddNewAd(){this.router.navigate(["add-new-advertisement"])}ngOnInit(){}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(f.F0),t.Y36(c.SH),t.Y36(P.eN))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-item-info"]],decls:28,vars:1,consts:[[1,"topNav"],[1,"advertisement"],[1,"adTitle"],[1,"cancelAd",3,"click"],["name","chevron-forward",1,"cancelIcon"],[1,"navigationBar"],[2,"background-color","#e30b1c"],[1,"adContent"],[1,"categories"],[1,"catTitle"],[1,"selectOption"],[4,"ngFor","ngForOf"],["color","danger","expand","block",1,"nextBtn",3,"click"],[1,"adImg"],["src","../../../assets/images/advertisement.jpg"],["slot","fixed","vertical","bottom","horizontal","end","id","floatingChatIcon"],["name","chatbubble"],[3,"innerHTML"]],template:function(e,l){1&e&&(t.TgZ(0,"ion-content"),t._UZ(1,"app-navbar",0),t.TgZ(2,"ion-card",1)(3,"ion-label",2),t._uU(4,"Add new advertisement"),t.qZA(),t.TgZ(5,"ion-card-content",3),t.NdJ("click",function(){return l.goBack()}),t.TgZ(6,"ion-label"),t._uU(7,"Back"),t.qZA(),t._UZ(8,"ion-icon",4),t.qZA()(),t.TgZ(9,"div",5),t._UZ(10,"div",6)(11,"div",6)(12,"div")(13,"div")(14,"div"),t.qZA(),t.TgZ(15,"div",7)(16,"ion-card",8)(17,"ion-card-header")(18,"ion-card-title",9),t._uU(19,"Real Estate Information"),t.qZA()(),t.TgZ(20,"ion-card-content",10),t.YNc(21,y,3,3,"div",11),t.TgZ(22,"ion-button",12),t.NdJ("click",function(){return l.goToUploadImage()}),t._uU(23,"Next Step"),t.qZA()()(),t.TgZ(24,"div",13),t._UZ(25,"img",14),t.qZA()(),t.TgZ(26,"ion-fab",15),t._UZ(27,"ion-icon",16),t.qZA()()),2&e&&(t.xp6(21),t.Q6J("ngForOf",l.items))},dependencies:[g.sg,c.YG,c.PM,c.FN,c.Zi,c.Dq,c.W2,c.IJ,c.gu,c.Q$,M.f,v],styles:["@media (max-width: 576px){.topNav[_ngcontent-%COMP%], .adImg[_ngcontent-%COMP%]{display:none}.advertisement[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;box-shadow:none!important;margin:60px 10px 20px;color:#484848;font-weight:700}.adTitle[_ngcontent-%COMP%]{font-size:15px}.cancelAd[_ngcontent-%COMP%]{display:flex;justify-content:right;align-items:center;padding:0}.cancelIcon[_ngcontent-%COMP%]{font-size:16px}.navigationBar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin:0 10px 40px}.navigationBar[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{border-radius:5px;background-color:#eee;height:.25rem;width:18%}.categories[_ngcontent-%COMP%]{border:1px solid #eee;box-shadow:none!important;border-radius:10px}.selectOption[_ngcontent-%COMP%]{color:#484848;font-weight:700}.catTitle[_ngcontent-%COMP%]{color:#484848;font-weight:700;font-size:18px}.inputAdTitle[_ngcontent-%COMP%]{border:1px solid #d9d9d9;border-radius:5px;margin-bottom:15px;font-weight:lighter;height:35px;font-size:12px}.adDetails[_ngcontent-%COMP%]{border:1px solid #d9d9d9;border-radius:5px;font-size:12px;margin-bottom:30px;font-weight:lighter}.nextBtn[_ngcontent-%COMP%]{text-transform:none}#floatingChatIcon[_ngcontent-%COMP%]{margin:33px 10px;position:fixed;background-color:#d90036;color:#fff;border-radius:100%;width:50px;height:50px;font-size:26px;display:flex;justify-content:center;align-items:center}}@media (min-width: 992px){.topNav[_ngcontent-%COMP%]{display:block;box-shadow:none;z-index:1000;position:fixed;margin:0;width:100%;height:144px}.innerTopNav[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;background-color:#f7f8f7;box-shadow:none;margin:0;padding:15px 80px}.langImg[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:3px;cursor:pointer}.topMenu[_ngcontent-%COMP%]{display:flex;font-size:24px;color:#212529;gap:20px}.topMenu[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;cursor:pointer}.topMenu_icon_title[_ngcontent-%COMP%]{font-size:12px;margin:0;color:#565656}.mainNav[_ngcontent-%COMP%]{display:flex;margin:0;align-items:center;gap:100px;font-size:19px;font-weight:200;color:#484848;padding:0 80px;border-radius:0;box-shadow:0 12px 10px -15px #484848}.mainNav[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:0;height:60px}.menu[_ngcontent-%COMP%]{border:3px solid #fff}.menu[_ngcontent-%COMP%]:hover{font-weight:700;border-bottom:3px solid #e30b1c;border-radius:3px;transition:.1s all ease-in-out;cursor:pointer}.logo[_ngcontent-%COMP%]{display:flex;align-items:center;margin-left:-30px}.websiteTitle[_ngcontent-%COMP%]{width:130px;height:60px;margin-right:80px;padding:0;cursor:pointer}.addNewAds[_ngcontent-%COMP%]{background-color:#e30b1c;height:50px;color:#fff;border-radius:10px;padding:0 20px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;cursor:pointer}.advertisement[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;box-shadow:none!important;margin:190px 6% 20px;color:#212529;font-weight:700}.adTitle[_ngcontent-%COMP%]{font-size:28px}.cancelAd[_ngcontent-%COMP%]{display:flex;justify-content:right;align-items:center;padding:0;font-size:18px;gap:5px;cursor:pointer}.cancelIcon[_ngcontent-%COMP%]{font-size:22px}.navigationBar[_ngcontent-%COMP%]{display:flex;justify-content:space-evenly;align-items:center;margin:0 6% 40px;gap:25px}.navigationBar[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{border-radius:5px;background-color:#eee;height:.3rem;width:20%}.adContent[_ngcontent-%COMP%]{display:flex;width:88%;margin:auto}.adImg[_ngcontent-%COMP%]{width:45%}.adImg[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{padding:0 0 0 20px}.categories[_ngcontent-%COMP%]{padding:35px 25px;border:1px solid #d9d9d9;box-shadow:none!important;border-radius:10px;width:55%}.catTitle[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:24px;font-weight:700;color:#212529;margin-bottom:20px}.selectOption[_ngcontent-%COMP%]{color:#484848;font-weight:700}.selectOption[_ngcontent-%COMP%] > ion-text[_ngcontent-%COMP%]{font-size:16px}.inputAdTitle[_ngcontent-%COMP%]{border:1px solid #d9d9d9;border-radius:5px;margin-bottom:25px;font-weight:lighter}.inputCheck[_ngcontent-%COMP%]{width:100%;border:1px solid red;font-size:18px}.nextBtn[_ngcontent-%COMP%]{text-transform:none;height:50px;margin-top:40px}#floatingChatIcon[_ngcontent-%COMP%]{position:fixed;right:55px;bottom:25px;background-color:#d90036;color:#fff;border-radius:100%;width:80px;height:80px;font-size:36px;display:flex;justify-content:center;align-items:center;cursor:pointer}}"]}),n})()}];let w=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[f.Bz.forChild(O),f.Bz]}),n})();var I=r(4547);let _=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[g.ez,h.u5,c.Pc,b,w,I.NavbarPageModule]}),n})()}}]);
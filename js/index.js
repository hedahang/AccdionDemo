var slider = function() {
	// 获取子元素
	function getElementsByClass(object, tag, className) {
		var o = object.getElementsByTagName(tag);
		for ( var i = 0, n = o.length, ret = []; i < n; i++) {
			if (o[i].className == className) ret.push(o[i]);
		}
		if (ret.length == 1) ret = ret[0];
		return ret;
	}
	// 	Slider
	function Slider(oCont) {
		this.slides = []; // 子元素数组
		this.over   = false;  // 判读子元素展开状态
		this.S      = 10; // 速度 默认10
		this.oc     = document.getElementById(oCont);  // 获取根元素
		this.frm    = getElementsByClass(this.oc, 'div', 'slide');   // 获取子节点
		this.NF     = this.frm.length;
		this.resize();  // 设置容器
		for (var i = 0; i < this.NF; i++) {
			this.slides[i] = new Slide(this, i);  // 初始化子元素
		} 
		this.oc.parent = this;    //  保存this
		this.view      = this.slides[0];   // 设置当前展开试图
		this.Z         = this.mx;  // 初始子元素显示宽度
	}
	Slider.prototype = {
		// loop 使之产生移动效果
		run : function () {
			this.Z += this.over ? (this.mn - this.Z) * .5 : (this.mx - this.Z) * .5;
			this.view.calc();
			var i = this.NF;
			while (i--) this.slides[i].move();
		},
		/* ==== resize  ==== */
		resize : function () {
			this.wh = this.oc.clientWidth;
			this.ht = this.oc.clientHeight;
			this.wr = this.wh;	//变大时当前子元素宽度
			this.mx = this.wh / this.NF;	//变小时时子元素宽度
			this.mn = 0;   //变大时其他子元素宽度
		}
	}
	// Slide
	Slide = function (parent, N) {
		this.parent = parent;
		this.N      = N;   // 当前子元素下标
		this.x0     = this.x1 = N * parent.mx;   // 初始位置 left
		this.obj    = parent.frm[N];
		this.img    = getElementsByClass(this.obj, 'img', 'imgOne');
		this.obj.style.left = Math.floor(this.x0) + 'px';   // 设置left
		// 事件绑定
		this.popBtn = getElementsByClass(this.obj, 'span', 'popBtn')
		this.popBtn.parent = this;
		this.popBtn.onclick = function() {
			this.parent.over();
			return false;
		}
	}
	Slide.prototype = {
		//	设置目标位置 left
		calc : function() {
			var that = this.parent;
			// left slides
			for (var i = 0; i <= this.N; i++) {
				that.slides[i].x1 = i * that.Z;
			}
			// right slides
			for (var i = this.N + 1; i < that.NF; i++) {
				that.slides[i].x1 = that.wh - (that.NF - i) * that.Z;
			}
		},
		// 移动
		move : function() {
			var that = this.parent;
			var s = (this.x1 - this.x0) / that.S;
			// console.log(s);
			// 设置left
			if (this.N && Math.abs(s) > 0) {
				this.obj.style.left = Math.round(this.x0 += s) + 'px';
			}
		},
		over : function () {
			if(this.parent.over){
				this.parent.over = false;
			}else{
				// this.parent.resize();
				this.parent.over = true;
				this.parent.view = this;  
				this.calc();
			}
			
		}
	}
	return {
		init : function(oCont, speed) {
			this.s1 = new Slider(oCont, speed);
			setInterval("slider.s1.run();", 16); 
		}
	}
}();
window.onload = function(){
	function getByClass(oParent,sClass){
	    //高级浏览器支持getElementsByClassName直接使用
	    if(oParent.getElementsByClassName){
	        return oParent.getElementsByClassName(sClass);
	    }else{
	        //不支持需要选中所有标签的类名来选取
	        var res=[];
	        var aAll=oParent.getElementsByTagName('*');
	        for(var i=0;i<aAll.length;i++){
	            //选中标签的全部类名是个str='btn on red'=aAll[i].className   使用正则  reg=/\b sClass \b/g
	            var reg= new RegExp('\\b'+sClass+'\\b','g');
	            if(reg.test(aAll[i].className)){
	                res.push(aAll[i]);
	            }
	        }
	        return res;
	    }
	}

	var courseBox = getByClass(document,"courseBox");
	var course = getByClass(document,"course");
	var showBox = getByClass(document,"showBox");
	for(var i = 0;i<course.length;i++){
		(function(i){
			course[i].onclick = function() {
				for(var j = 0;j<showBox.length;j++){
					if(i == j){
						showBox[j].style.display = "block"; 
						courseBox[j].className = "courseBox cur";
					}else{
						showBox[j].style.display = "none"; 
						courseBox[j].className = "courseBox";
					}
				}
			}
		})(i)
	}
	// console.log(course);
	// console.log(showBox);
}
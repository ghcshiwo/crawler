var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/762';
//过滤章节
function filterChapters(html){
	var $ = cheerio.load(html);
	var chapters = $('.chapter');
	var courseData =[];
	chapters.each(function(item){
		var chapter = $(this);
		var chapterTitle = chapter.find('strong').text().replace(/\s+/g,"");
		var video = chapter.find('.video').children('li');
		var chapterData = {
			chapterTitle:chapterTitle,
			videos:[]
		};
		video.each(function(item){
			var video = $(this).find('.J-media-item');
			var videoTitle = video.text().replace(/\s+/g,"");
			var id = video.attr('href').split('code/')[1];
			chapterData.videos.push({
				title:videoTitle,
				id:id
			})
		});
		courseData.push(chapterData);
	});
	return courseData;
}
function printCourseData(courseData) {
	courseData.forEach(function (item) {
		var chapterTitle = item.chapterTitle;
		console.log(chapterTitle + '\n');
		item.videos.forEach(function (video) {
			console.log(' 【' + video.id + '】 ' + video.title + '\n');
		})
	})
}
http.get(url,function(res){
	var html ='';
	res.on('data',function(data){
		html+=data;
	});
	res.on('end',function(){
		var courseData = filterChapters(html);
		printCourseData(courseData);
	})
}).on('error',function(){
	console.log('获取课程出错！');
});
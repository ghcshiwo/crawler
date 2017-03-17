/**
 * Created by Guo on 2017/3/17.
 */
var phantom = require("phantom");
var cheerio = require('cheerio');
var fs = require('fs');
var _ph, _page;

function filterList(html){
	var $ = cheerio.load(html);
	var songitems = $('.songlist__list>li');
	var data =[];
	songitems.each(function(item){
		var songitem = $(this);
		var number = songitem.find('.songlist__number').text();
		var songName = songitem.find('.js_song').text();
		var singer = songitem.find('.singer_name').text();
		var time = songitem.find('.songlist__time').text();
		var songData = {
			songName:songName,
			number:number,
			singer:singer,
			time:time
		};
		data.push(songData);
	});
	return data;
}
function songToString(data) {
	var song = '';
	data.forEach(function (item) {
		var songName = item.songName;
		var number = item.number;
		var singer = item.singer;
		var time = item.time;
		song += number +'-'+songName +'-'+singer +'-'+time+ '\n';
	});
	return song;
}
phantom.create().then(ph => {
	_ph = ph;
	return _ph.createPage();
}).then(page => {
	_page = page;
	return _page.open('https://y.qq.com/n/yqq/toplist/27.html#');
}).then(status => {
	console.log(status);
	return _page.property('content')
}).then(content => {
	var data = filterList(content);
	fs.writeFile('message.html', songToString(data), (err) => {
		if (err) throw err;
		console.log('It\'s saved!');
	});
	_page.close();
	_ph.exit();
}).catch(e => console.log(e));
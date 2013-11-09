## **audioplayer.js Project**

- `Html5 AudioPlayer` 프로젝트 입니다.

### **특징**
플레이엔씨 게임 사이트에서 각종 음원을 재생하기 위한 js 라이브러리입니다.
`<audio>` 를 지원하는 ie9+, chrome, firefox, Opera 브라우저에서 음원 재생을 합니다.
모든 브라우저 지원을 위하여 .mp3 .ogg 두가지 형식의 파일이 서버에 존재해야 합니다.
마크업을 유지한 상태로 css로 각 사이트에 맞는 스킨 디자인 변경 가능
ie7, ie8 에서는 기존 `<embed>` 방식을 이용하여 자동으로 변환되어 재생 됩니다.
ie7, ie8 브라우저에서는 `play()` 외의 함수는 지원되지 않습니다....

  
### **Sample page**
- [Html5 AudioPlayer sample page][samplepage1]


### **Usage**

#### Markup
``` html

<div class="audioplayer" id="myaudio">

	<audio preload="auto" controls=""></audio>

	<div class="buttons" title="Play">
		<a class="play" href="#">Play</a>
		<a class="next" href="#">next</a>
		<a class="prev" href="#">prev</a>
		<a class="volume" href="#">volume</a>
	</div>

	<div class="time-current">00:00</div>
	<div class="time-total">-00:00</div>
	<div class="time-loaded">loaded</div>
	<div class="volume-current">vol 50%</div>

	<div class="barbg time">
		<div class="barbg loaded"></div>
		<div class="barbg current"></div>
	</div>

	<div class="barbg volume">
		<div class="barbg current"></div>
	</div>

</div>

```

#### Javascript
- **selector** : Audio Player 의 jQuery셀렉터 `String` `필수`
- **source** : Audio 파일의 경로 `Array` `필수`
- **random** : 랜덤 재생 `Boolean` `선택`

``` javascript

	var musicList = ['media/audio1', 'media/audio2', 'media/audio3', 'media/kashmir'];
	var au = new audioplayer({
		selector: '#myaudio',
		source: musicList,
		random: false
	});
	
	au.play();
	au.pause();
	au.next();
	au.prev();
	au.play(['media/audio1', 'media/audio2']);

```

---
### **Audio Formats and Browser Support**

| Browser  | MP3      | Wav      | Ogg      |
| -------- | -------- | -------- | -------- |
| IE       | YES      | NO       | NO       |
| Chrome   | YES      | YES      | YES      |
| Firefox  | YES      | YES      | YES      |
| Safari   | YES      | YES      | NO       |
| Opera    | NO       | YES      | YES      |


### **2013년 9월 데스크톱 웹 브라우저 점유율**
1. 1위 - IE : 57.79%
2. 2위 - Firefox : 18.58%
3. 3위 - Chrome : 15.98%
4. 4위 - Safari : 5.77%
5. 5위 - Opera : 1.47%

[HTML Audio/Video DOM Reference][audioReference]



[samplepage1]: http://plat-lego.korea.ncsoft.corp/!/uikit/html5audioplayer/examples/audioplayer.html
[audioReference]: http://www.w3schools.com/tags/ref_av_dom.asp
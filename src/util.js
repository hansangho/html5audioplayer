var apUtil = (function( $ ) {
	var This = {};
    // reset option
    This.extend = function(dest, src) {
        for (var k in src) {
            if (src.hasOwnProperty(k)) {
                dest[k] = src[k];
            }
        }
        return dest;
    }

    // reset random array
    This.shuffleArray = function(array) {
		var len = array.length;
		for(var i=len ; i>0 ; i--) { 
			array[len-1] = array.splice(Math.floor(Math.random() * i),1)[0];
		} 
	} 

	// second -> minute
	This.second2minute = function( dur ) {
		var num = Math.round( dur );
		
		var m = Math.floor( num/60 );
		var s = Math.round( num%60 );
		
		var ms = String( m );
		var ss = String( s );
		
		if( m<10 ) ms = "0"+ms;
		if( s<10 ) ss = "0"+ss;
		
		return ms+":"+ss;
    }

    // per
    This.getPer = function( now, total ){
        var per = now/total*100;
        return per;
    }

    This.getRePer = function( per, total ){
        var rePer = per/100*total;
        return rePer;
    }

	return This;
}( jQuery ));

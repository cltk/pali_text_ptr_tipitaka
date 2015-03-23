function newquiz() {
	document.getElementById('mafa').innerHTML = '';
	document.getElementById('mafb').innerHTML = '<input type="hidden" id="qno" value="1"><input type="hidden" id="ran" value="0"><input type="hidden" id="wan" value="0"><p><b>Pali Quiz: Question #<font id="qn"></font></b></p><p id="checka"><i>(click on the button corresponding to the right answer below)</i></p><p>What is the meaning of "<font id="qq"></font>"?</p><p><font id="answers"></font></p><hr><p><table width=100%><tr><td>Right Answers: <font id="ra" style="color:'+colorcfg['green']+'"></font></td><td>Wrong Answers: <font id="wa" style="color:'+colorcfg['red']+'"></font></td><td>Percent: <font id="pa"></font></td></tr></table><hr><p>Total Right Answers: <font id="rights"></font> <input type="button" value="clear" onclick="clearrights()>';
	document.getElementById('ra').innerHTML = '0';
	document.getElementById('wa').innerHTML = '0';
	quizme();
}

function quizme() {
	
	// remember rights
	var nameEQ = 'DPTEST=';
	var rights = [];
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) 
		{
			rights = c.substring(nameEQ.length,c.length).split(',');
			break;
		}
	}	
	document.getElementById('rights').innerHTML = rights.length;
	var quiza = new Array();
	var quizeachwrong = new Array();
	var quizanswersout = '';
	var quizrandomright=Math.floor(Math.random()*20926);
	if (rights.length > 13) {
		alert('Congratulations, you\'ve completed the entire dictionary!');
		clearrights();
	}
	else while (("|" + rights.join("|") + "|").indexOf('|'+quizrandomright+'|') > -1) { // in case we got it right before
		quizrandomright=Math.floor(Math.random()*20926);
	}	
	var qtmp2 = 0;
	
	var quizrightorder=Math.floor(Math.random()*4);
	for (quizcpd in yt){
		quiza.push(quizcpd);
	}
	for (qtmp = 0; qtmp < 3; qtmp++) {
		quizeachwrong[qtmp]=Math.floor(Math.random()*20926);
		while (quizeachwrong[qtmp] == quizrandomright) { // in case we got the same one again!
			quizeachwrong[qtmp]=Math.floor(Math.random()*20926);
		}
	}
	
	var questionout =  quiza[quizrandomright].replace(/,/g, '.');
	questionout =  replaceunistandard(questionout.replace(/`n/g, '"n'));

	document.getElementById('qn').innerHTML = document.getElementById('qno').value;
	document.getElementById('qq').innerHTML = questionout;
	
	var formatanswerwrong = '';
	var formatanswer = yt[quiza[quizrandomright]].replace(/\&comma/g, ',').split('xxx')[0].replace(/,$/, "").replace(/,/g, '.').replace(/\'/g, '\\\'');
	var formatanswerout = yt[quiza[quizrandomright]].replace(/\&comma/g, ',').split('xxx')[0].replace(/,$/, "").replace(/,/g, '.').replace(/\'/g, '\\\'');
	if (yt[quiza[quizrandomright]].split('xxx').length > 1) formatanswerout += ' (' + yt[quiza[quizrandomright]].replace(/\&comma/g, ',').split('xxx')[1].replace(/,/g, '.') + ')';
	for (qtmp = 0; qtmp < 4; qtmp++) {
		if (qtmp == quizrightorder) {
			quizanswersout += '<p><input type=button onclick="answerquiz(1,\'' + questionout + ' = ' + formatanswerout + '\',' + quizrandomright + ')" value="&gt"> '+formatanswer+'</p>';
		}
		else {
			formatanswerwrong = yt[quiza[quizeachwrong[qtmp2]]].replace(/\&comma/g, ',').split('xxx')[0].replace(/,$/, "").replace(/,/g, '.').replace(/\'/g, '\\\'');
			quizanswersout += '<p><input type=button onclick="answerquiz(0,\'' + questionout + ' = ' + formatanswerout + '\')" value="&gt"> '+formatanswerwrong+'</p>';
			qtmp2++;
		}
	}
	document.getElementById('answers').innerHTML = quizanswersout;
}

function answerquiz(right,answer,numb) {
	document.getElementById('qn').innerHTML = ++document.getElementById('qno').value;
	if (right == 1) {
		document.getElementById('checka').innerHTML = '<font color=green>Right! &nbsp;' + answer + '</font>';
		document.getElementById('ra').innerHTML = ++document.getElementById('ran').value;
		
		// add right to list of rights
		
		var nameEQ = 'DPTEST=';
		var rights = [];
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) 
			{
				rights = c.substring(nameEQ.length,c.length).split(',');
				rights.push(numb);
				createCookie('DPTEST',rights.join(','),36500);
				break;
			}
			else createCookie('DPTEST',numb,36500);
		}		
	}	
	else {
		document.getElementById('checka').innerHTML ='<font color=red>Wrong! &nbsp;' + answer + '</font>';
		document.getElementById('wa').innerHTML = ++document.getElementById('wan').value;
	}

	var percentr = Number(document.getElementById('ran').value) / (Number(document.getElementById('ran').value) + Number(document.getElementById('wan').value))*100;

	/*var colorpc = 0;
	if (percentr <= 50) {
		colorpc = Math.round(percentr/50*255);
		colorpc = colorpc.toString(16).toUpperCase();
		if (colorpc.length == 1) colorpc = '0'+colorpc;
		document.getElementById('pa').setAttribute('style','color:#'+ 'FF' + colorpc + '00');
	}
	else {
		colorpc = Math.round((percentr - 50)/50*255)*-1+255;
		colorpc = colorpc.toString(16).toUpperCase();
		if (colorpc.length == 1) colorpc = '0'+colorpc;
		document.getElementById('pa').setAttribute('style','color:#' + colorpc +'FF' + '00');
	}*/
	document.getElementById('pa').innerHTML = Math.round(percentr) + '%';
	quizme();
}

function clearrights() {
	var date = new Date();
	date.setTime(date.getTime())-(2*24*60*60*1000);
	document.cookie = "DPTEST=a; expires=" + date.toGMTString() + "; path=/";
	quizme();
}

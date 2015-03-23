var nikname = new Array();
nikname['d'] = "DN";
nikname['m'] = "MN";
nikname['s'] = "SN";
nikname['a'] = "AN";
nikname['k'] = "KN";
nikname['v'] = "Vin";
nikname['x'] = "Vism";
nikname['y'] = "Abhi";
nikname['g'] = "Gram";

var niknumber = new Array();
niknumber['v'] = "0";
niknumber['d'] = "1";
niknumber['m'] = "2";
niknumber['s'] = "3";
niknumber['a'] = "4";
niknumber['k'] = "5";
niknumber['y'] = "6";
niknumber['x'] = "7";
niknumber['g'] = "8";

var nikvoladi = new Array();
nikvoladi['d'] = '<select size="7" name="book" onclick="gettitles(0,2)"><option selected>1</option><option>2</option><option>3</option></select>';
nikvoladi['m'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected>1</option><option>2</option><option>3</option></select>';
nikvoladi['s'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>';
nikvoladi['a'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option></select>';
nikvoladi['k'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected value="1">KhP</option><option value="2">Dhp</option><option value="3">Uda</option><option value="4">Iti</option><option value="5">SN</option><option value="6">ViV</option><option value="7">PeV</option><option value="8">Thera</option><option value="9">Theri</option><option value="10">Ap.1</option><option value="11">Ap.2</option><option value="12">BdV</option><option value="13">Car</option><option value="14">Jat.1</option><option value="15">Jat.2</option><option value="16">MNid</option><option value="17">CNid</option><option value="18">PsM</option><option value="19">Mil</option><option value="20">Net</option><option value="21">Pet</option></select>';
nikvoladi['v'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option value="1" selected>Para</option><option value="2">Paci</option><option value="3">BhV</option><option value="4">MV</option><option value="5">CV</option><option value="6">Pari</option></select>';
nikvoladi['x'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option value="1" selected>1</option><option value="2">2</option></select>';
nikvoladi['y'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option></select>';
nikvoladi['g'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected value="1">Mog</option><option value="2">Kac</option><option value="3">SPM</option><option value="4">SDhM</option><option value="5">PRS</option></select>';


function changenikaya(noget)
{
	var nik = document.form.nik.value;
	if (nik != '') 
	{
		document.getElementById('book').innerHTML=nikvoladi[nik];
		if (noget) gettitles(0,1);
		else gettitles(0,2);
	}
}

function replaceunistandard(input) {
	input = input.replace(/aa/g, 'ā');
	input = input.replace(/ii/g, 'ī');
	input = input.replace(/uu/g, 'ū');
	input = input.replace(/\.t/g, 'ṭ');
	input = input.replace(/\.d/g, 'ḍ');
	input = input.replace(/\"n/g, 'ṅ');
	input = input.replace(/\.n/g, 'ṇ');
	input = input.replace(/\.m/g, 'ṃ');
	input = input.replace(/\~n/g, 'ñ');
	input = input.replace(/\.l/g, 'ḷ');
	input = input.replace(/AA/g, 'Ā');
	input = input.replace(/II/g, 'Ī');
	input = input.replace(/UU/g, 'Ū');
	input = input.replace(/\.T/g, 'Ṭ');
	input = input.replace(/\.D/g, 'Ḍ');
	input = input.replace(/\.N/g, 'Ṇ');
	input = input.replace(/\.M/g, 'Ṃ');
	input = input.replace(/\~N/g, 'Ñ');
	input = input.replace(/\.L/g, 'Ḷ');
	return input;
}

function replacevelstandard(input) {
	input = input.replace(/\u0101/g, 'aa');
	input = input.replace(/\u012B/g, 'ii');
	input = input.replace(/\u016B/g, 'uu');
	input = input.replace(/\u1E6D/g, '\.t');
	input = input.replace(/\u1E0D/g, '\.d');
	input = input.replace(/\u1E45/g, '\"n');
	input = input.replace(/\u1E47/g, '\.n');
	input = input.replace(/\u1E43/g, '\.m');
	input = input.replace(/\u00F1/g, '\~n');
	input = input.replace(/\u1E37/g, '\.l');
	input = input.replace(/\u0100/g, 'AA');
	input = input.replace(/\u012A/g, 'II');
	input = input.replace(/\u016A/g, 'UU');
	input = input.replace(/\u1E6C/g, '\.T');
	input = input.replace(/\u1E0C/g, '\.D');
	input = input.replace(/\u1E46/g, '\.N');
	input = input.replace(/\u1E42/g, '\.M');
	input = input.replace(/\u00D1/g, '\~N');
	input = input.replace(/\u1E36/g, '\.L');
	return input;
}

function convtitle(nikaya,book,vna,wna,xna,yna,zna)
{
	nikaya = nikname[nikaya];
	
	var title='<table><tr><td><font class="blue">' + nikaya + ' ' + book + ' ' + vna;
	if (wna != ' ') title += '</font>&nbsp;</td><td><font class="green">' + wna + '</font>&nbsp;</td>';
	if (xna != ' ') title += '<td><font class="yellow">' +  xna + '</font></td>';
	if (yna != ' ') title += '<td><font class="green">' + yna + '</font>&nbsp;</td>';
	if (zna != ' ') title += '<td><font class="yellow">' +  zna + '</font></td>';
	title += '</tr></table>';
	
	title = replaceunistandard(title);
	document.getElementById('mafa').innerHTML=title;
}

function createTablen()
{
	var section = document.form.section.selectedIndex + 1;
	if (section < document.form.section.options.length)
	{
		document.form.section.selectedIndex++;
		importXML();			
	}
	else 
	{
		var sutta = document.form.sutta.selectedIndex + 1;
		if (sutta < document.form.sutta.options.length)
		{
			document.form.sutta.selectedIndex++;
			gettitles(1);					
		}
		else {
			var vagga = document.form.vagga.selectedIndex + 1;
			if (vagga < document.form.vagga.options.length)
			{
				document.form.vagga.selectedIndex++;
				gettitles(4);	
			}
			else 
			{
				var volume = document.form.volume.selectedIndex + 1;
				if (volume < document.form.volume.options.length)
				{
					document.form.volume.selectedIndex++;
					gettitles(5);	
				}
				else {
					var meta = document.form.meta.selectedIndex + 1;
					if (meta < document.form.meta.options.length)
					{
						document.form.meta.selectedIndex++;
						gettitles(6);	
					}
					else
					{
						window.alert('End of Book');
					}
				}
			}
		}
	}

}

function createTablep()
{

	var section = document.form.section.selectedIndex - 1;
	if (section >= 0)
	{
		document.form.section.selectedIndex--;
		importXML();			
	}
	else 
	{
		var sutta = document.form.sutta.selectedIndex - 1;
		if (sutta >= 0)
		{
			document.form.sutta.selectedIndex--;
			gettitles(1,1);	
			document.form.section.selectedIndex = document.form.section.options.length - 1;
			importXML();			
		}
		else {
			var vagga = document.form.vagga.selectedIndex - 1;
			if (vagga >= 0) {
				document.form.vagga.selectedIndex--;
				gettitles(4,1);	
				document.form.sutta.selectedIndex = document.form.sutta.options.length - 1;
				gettitles(1,1);	
				document.form.section.selectedIndex = document.form.section.options.length - 1;
				importXML();
			}
			else 
			{
				var volume = document.form.volume.selectedIndex - 1;
				if (volume >= 0)
				{
					document.form.volume.selectedIndex--;
					gettitles(5,1);	
					document.form.vagga.selectedIndex = document.form.vagga.options.length - 1;
					gettitles(4,1);	
					document.form.sutta.selectedIndex = document.form.sutta.options.length - 1;
					gettitles(1,1);	
					document.form.section.selectedIndex = document.form.section.options.length - 1;
					importXML();

				}
				else {
					var meta = document.form.meta.selectedIndex - 1;
					if (meta >= 0)
					{
						document.form.meta.selectedIndex--;
						gettitles(6,1);	
						document.form.volume.selectedIndex = document.form.volume.options.length - 1;
						gettitles(5,1);	
						document.form.vagga.selectedIndex = document.form.vagga.options.length - 1;
						gettitles(4,1);	
						document.form.sutta.selectedIndex = document.form.sutta.options.length - 1;
						gettitles(1,1);	
						document.form.section.selectedIndex = document.form.section.options.length - 1;
						importXML();
					}
					else
					{
						window.alert('Beginning of Book');
					}
				}
			}
		}
	}

}

function preout(data) // calls text prep, then outputs it to preFrame
{
	lastcolour = 0; // reset colour changing
/*	if (document.getElementById('autoalg').checked == true)
	{
		moveframex(0,'*',0,0);
		parent.mainFrame.postout(data);		
	}
	else {*/
		var inarray = preparepali(data);
		var finout = inarray[0];
		var convout = replaceunistandard(inarray[1]);
		document.getElementById('mafb').innerHTML = finout;
		document.getElementById('mafb').innerHTML += ' <input type="button" title="Send all text to converter" onclick="sendtoconvert(\'' + convout + '\')" value="convert"> <input type="button" title="Send selected text to converter" onclick="var convout2 = document.getSelection(); if (convout2) sendtoconvert(convout2);  else alert(\'Nothing selected.\');" value="convert selection">';
		document.getElementById('maf').scrollTop = 0; // horizontal and vertical scroll targets
		//var frames = top.document.getElementById('fs3').rows.split(',')[0];
		moveframex(2);
	//}
	
}

function formatuniout(data,which) { // prepare without links
	var convout = '';
	var indexpage = '';
	var altread = 0;
	var altplus = '';	
	var endpt = 0;
	var unioutb = '';
	var finout = '';
	var outarray = new Array();
	
	data = data.replace(/\.\.\.pe0\.\.\./g, ' ... pe ...');
	data = data.replace(/\'\'/g, '``');
	data = data.replace(/\^b\^/g, ' <b> ');
	data = data.replace(/\^eb\^/g, ' </b> ');
	data = data.replace(/\^a\^\"/g, ' z');
	data = data.replace(/\"\^ea\^/g, 'z ');
	data = data.replace(/\^a\^/g, ' z');
	data = data.replace(/\^ea\^/g, 'z ');
	data = data.replace(/\^v/g, '');
	data = data.replace(/v\^/g, '');
	data = data.replace(/\}/g, '} ');
	data = data.replace(/ +/g, ' ');
	var uniouta = replaceunistandard(data).split(' ');
	data = data.replace(/\"/g, '\u00B4');
	data = data.replace(/\'/g, '`');
	var wordbyword = data.split(' ');
	var addpre = '';
	
//	document.getElementById('b').innerHTML += '<p>';
	
	for (var b = 0; b < wordbyword.length; b++)
	{
		if (altread == 1) {
			endpt = wordbyword[b].length-1;
			if (wordbyword[b].charAt(endpt) == '}') {
					altplus += wordbyword[b].substring(0,endpt);
			  altread = 0;
			  altplus = replaceunistandard(altplus);
			  altplus = altplus.replace(/0/g, '.');
			  finout += ' <a href="javascript:void(0)" style="color:'+colorcfg['grey']+'" title="' + altplus + '"><font size=1>VAR</font></a> ';
			}
			else altplus += wordbyword[b] + ' ';
		}
		else if (wordbyword[b].charAt(0) == '{') {
			altread = 1;
			altplus = wordbyword[b].substring(1) + ' ';
		}
		else if (wordbyword[b+1] == '-') { // connect first part to search
			addpre = wordbyword[b];
			b++;
		}
		else if (wordbyword[b].substring(0,2) == '<c' && wordbyword[b+3] == '-') { // connect search with rest of word
			convout += addpre + wordbyword[b+1] +  wordbyword[b+4] + ' ';
			unioutb = (replaceunistandard(addpre).replace(/``/g, '&quot;') + ' - <' + wordbyword[b].substring(1,3) + '>' + uniouta[b+1].replace(/``/g, '&quot;') + '<xc> - ' + uniouta[b+4]).replace(/``/g, '&quot;');
			if (script != 0) unioutb = translit(unioutb);
			finout += '<a id="' + b + '" style="color:'+colorcfg['coltext']+'" href="javascript:postout(&#39;' + addpre + wordbyword[b+1] +  wordbyword[b+4] +  '&#39;,' + b + ')">' +  unioutb + '</a> ';
			b = b + 4;
			addpre = '';
		}		

		else if (wordbyword[b].substring(0,2) == '<f') {
			finout += wordbyword[b] + ' ';
		}		
		else if (wordbyword[b].charAt(0) == '<')		{
			finout += wordbyword[b];
		}
		else if (wordbyword[b].charAt(0) == 'z')
		{
			indexpage = wordbyword[b].charAt(1);
			finout += ' <a href="javascript:void(0)" title="' + wordbyword[b].substring(2,8) + '"><font size=1>' + indexpage + '</font></a> ';
		}
		else if (which)
		{
			convout += wordbyword[b] + ' ';
			unioutb = uniouta[b].replace(/``/g, '&quot;');
			unioutb = unioutb.replace(/0/g, '.');
			if (script != 0) unioutb = translit(unioutb);
			finout += unioutb + ' ';
		}
		else
		{
			convout += wordbyword[b] + ' ';
			unioutb = uniouta[b].replace(/``/g, '&quot;');
			unioutb = unioutb.replace(/0/g, '.');
			if (script != 0) unioutb = translit(unioutb);
			finout += '<a id="' + b + '" style="color:'+colorcfg['coltext']+'" href="javascript:postout(&#39;' + wordbyword[b] + '&#39;,' + b + ')">' +  unioutb + '</a> ';
		}
	}
	finout = finout.replace(/ <b> /g, '<b>');
	finout = finout.replace(/ <\/b> /g, '</b>');
	if (!which) {
		outarray[0] = finout;
		outarray[1] = convout;
		return outarray;
	}
	return finout;
}

function preparepali(data) { // standard text prep for algorithm
	
	var finout = formatuniout(data);
	
	// add search markers
	
	finout[0] = finout[0].replace(/<c0> */g, ' <span style="BACKGROUND-COLOR: '+colorcfg['colbk1']+'">');
	finout[0] = finout[0].replace(/<c1> */g, ' <span style="BACKGROUND-COLOR: '+colorcfg['colbk2']+'">');
	finout[0] = finout[0].replace(/<c2> */g, ' <span style="BACKGROUND-COLOR: '+colorcfg['colbk3']+'">');
	finout[0] = finout[0].replace(/ *<xc>/g, '</span> ');
	finout[0] = finout[0].replace(/ *- */g, '');
	finout[0] = finout[0].replace(/BACKGROUNDCOLOR/g, 'BACKGROUND-COLOR');

	return finout;
}

function xmlrefer()
{
	var nik = document.form.nik.selectedIndex;
	var book = document.form.book.selectedIndex;
	var sutta = document.form.sutta.selectedIndex;
	var sect = document.form.section.selectedIndex;
	var ref = '<xml>' + nik + ',' + book + ',' + sutta + ',' + sect + '</xml>'
	document.form.xmlref.value = ref;
}

function thaiconv(input,type) {
	var vowel = [];
	vowel['a'] = 1;
	vowel['i'] = 1;
	vowel['u'] = 1;
	vowel['e'] = 2;
	vowel['o'] = 2;

	var spec = [];
	spec['k'] = 1;
	spec['g'] = 1;
	spec['c'] = 1;
	spec['j'] = 1;
	spec['t'] = 1;
	spec['d'] = 1;
	spec['p'] = 1;
	spec['b'] = 1;

	var thair = [];
	thair['a'] = 'อ';
	thair['aa'] = 'า';
	thair['i'] = 'ิ';
	thair['ii'] = 'ี';
	thair['i.m'] = 'ึ';
	thair['u'] = 'ุ';
	thair['uu'] = 'ู';
	thair['e'] = 'เ';
	thair['o'] = 'โ';
	thair['.m'] = 'ํ';
	thair['k'] = 'ก';
	thair['kh'] = 'ข';
	thair['g'] = 'ค';
	thair['gh'] = 'ฆ';
	thair['"n'] = 'ง';
	thair['c'] = 'จ';
	thair['ch'] = 'ฉ';
	thair['j'] = 'ช';
	thair['jh'] = 'ฌ';
	thair['~n'] = 'ญ';
	thair['.t'] = 'ฏ';
	thair['.th'] = 'ฐ';
	thair['.d'] = 'ฑ';
	thair['.dh'] = 'ฒ';
	thair['.n'] = 'ณ';
	thair['t'] = 'ต';
	thair['th'] = 'ถ';
	thair['d'] = 'ท';
	thair['dh'] = 'ธ';
	thair['n'] = 'น';
	thair['p'] = 'ป';
	thair['ph'] = 'ผ';
	thair['b'] = 'พ';
	thair['bh'] = 'ภ';
	thair['m'] = 'ม';
	thair['y'] = 'ย';
	thair['r'] = 'ร';
	thair['l'] = 'ล';
	thair['.l'] = 'ล';
	thair['v'] = 'ว';
	thair['s'] = 'ส';
	thair['h'] = 'ห';

	var i0 = '';
	var i1 = '';
	var i2 = '';
	var i3 = '';
	var i4 = '';
	var i5 = '';
	var output = '';
	var cons = 0;
	var i = 0;
	
	input = input.replace(/\&quot;/g, '`');

	while (i < input.length) {
		i0 = input.charAt(i-1);
		i1 = input.charAt(i);
		i2 = input.charAt(i+1);
		i3 = input.charAt(i+2);
		i4 = input.charAt(i+3);
		i5 = input.charAt(i+4);
		
		if (vowel[i1]) {
			cons = 0;
			if (i1 == 'o' || i1 == 'e') {
				output += thair[i1];
				if (i == 0 || i0 == 'a') output += thair['a'];
				i++;
			}
			else {
				if (i == 0 || i0 == 'a') output += thair['a'];
				if (i1 == i2) {
					output += thair[i1+i2];
					i = i + 2;	
				}
				else if (i1 == 'i' && i2 == '.' && i3 == 'm') { // special i.m character
					output += thair[i1+i2+i3];
					i = i + 3;				
				}
				else if (i1 != 'a') { // nothing for a
					output += thair[i1];
					i++;
				}
				else i++;
			}
		}		
		else if (thair[i1+i2+i3]) {		// three character match
			cons++;
			if (cons >= 2) output += 'ฺ';
			if (i4 == 'o' || i4 == 'e') {
				output += thair[i4];
				i++;
				cons = 0;
			}	
			output += thair[i1+i2+i3];
			i = i + 3;
		}					
		else if (thair[i1+i2]) {		// two character match
			cons++;
			if (i2 == 'm') cons = 0 // exception for .m
			if (cons >= 2) output += 'ฺ';
			if (i3 == 'o' || i3 == 'e') {
				output += thair[i3];
				i++;
				cons = 0;
			}	
			output += thair[i1+i2];
			i = i + 2;
		}					
		else if (thair[i1] && i1 != 'a') {		// one character match except a
			cons++;
			if (cons >= 2) output += 'ฺ';
			if (i2 == 'o' || i2 == 'e') {
				output += thair[i2];
				i++;
				cons = 0;
			}	
			output += thair[i1];
			i++;
		}					
		else if (!thair[i1]) {
			cons = 0;
			output += i1;
			i++;				
			if (i2 == 'o' || i2 == 'e') {  // long vowel first
				output += thair[i2];
				i++;
				cons = 0;
			}
			if (vowel[i2]) {  // word-beginning vowel marker
				output += thair['a']; 
			}
		}
		else i++;
	}
	output = output.replace(/\`+/g, '"');
	return output;
}	

var script = 0;

function chscript(reset) {
	var scra = [];
	scra[0] = '<input type="button" value="T" onClick="chscript()" title="Change to Thai script">';
	scra[1] = '<input type="button" value="R" onClick="chscript()" title="Change to Roman script">';
	if (reset) script = 0;
	else script++;
	if (script >= scra.length) script = 0;
	document.getElementById('script').innerHTML = scra[script];
	importXML();
}
		
function translit(input) {
	if (script == 1) output = thaiconv(replacevelstandard(input));
	return output;
}

// JavaScript Document
<!--

function SymError()
{
  return true;
}

window.onerror = SymError;



/*************************************************************
 * fade script ver0.1 by Kouichirou Eto 1996/02/20
 * Copyright (c) 1996 Kouichirou Eto. All Rights Reserved.
 * You can freely copy, use, modify this script,
 * if the credit is given in the source.
 * If you would like to get information for this script,
 * please access <http://eto.com/JavaScript/>
 */

function makearray(n) {
    this.length = n;
    for(var i = 1; i <= n; i++)
        this[i] = 0;
    return this;
}

hexa = new makearray(16);
for(var i = 0; i < 10; i++)
    hexa[i] = i;
hexa[10]="a"; hexa[11]="b"; hexa[12]="c";
hexa[13]="d"; hexa[14]="e"; hexa[15]="f";

function hex(i) {
    if (i < 0)
	return "00";
    else if (i > 255)
	return "ff";
    else
	return "" + hexa[Math.floor(i/16)] + hexa[i%16];
}

function setElementColor(r, g, b, elementid) {
    var hr = hex(r); var hg = hex(g); var hb = hex(b);
    document.getElementById(elementid).style.color = "#"+hr+hg+hb;
}

var colortimer;

function fade(sr, sg, sb, er, eg, eb, step, elementid,i) {
		if ( i <= step )
		{
//	    document.getElementById(elementid).innerHTML = sr + "," + sg + "," + sb + "," + er + "," + eg + "," + eb + "," + step + "," + elementid + "," + i;
			setElementColor(
			Math.floor(sr * ((step-i)/step) + er * (i/step)),
			Math.floor(sg * ((step-i)/step) + eg * (i/step)),
			Math.floor(sb * ((step-i)/step) + eb * (i/step)),
			elementid);
			
			i++;
			colortimer = setTimeout("fade(" + sr + "," + sg + "," + sb + "," + er + "," + eg + "," + eb + "," + step + ",'" + elementid + "'," + i + ")", 1);
		}
}

/* Usage:
 *   fade(inr,ing,inb, outr,outg,outb, step);
 * example.
 *   fade(0,0,0, 255,255,255, 255);
 * fade from black to white with very slow speed.
 *   fade(255,0,0, 0,0,255, 50);
 *   fade(0xff,0x00,0x00, 0x00,0x00,0xff, 50); // same as above
 * fade from red to blue with fast speed.
 * step 2 is very fast and step 255 is very slow.
 */

function fadein() {
/*    fade(0,0,0, 255,255,255, 64);*/
}

function fadeout() {
/*    fade(255,255,255, 0,0,0, 64);*/
}
function rgbparse(color)
{
	var colors = new Array(3);
	if ( color.charAt(0) == '#' )
	{
		hexcolor = parseInt(color.substring(1),16);
		colors[0] = ((hexcolor & 0xFF0000) >> 16);
		colors[1] = ((hexcolor & 0x00FF00) >> 8 );
		colors[2] = (hexcolor & 0x0000FF);
	}
	else {
		var start;
		
		colors[0] = parseInt( color.substring(4));
		start = color.indexOf(',',4); start++;
		colors[1] = parseInt( color.substring(start));
		start = color.indexOf(',',start); start++;
		colors[2] = parseInt( color.substring(start));
	}
	return colors;		
}

function fadetext(elementid)
{
	oldcolor = document.getElementById(elementid).style.color;

	var colors = rgbparse(oldcolor);
	
	fade(colors[0],colors[1],colors[2],255,255,255,64, elementid, 0);
}

var message = new Array(3);
message[0]="www.wocaassoc.com";
message[1]="www.kirtiintl.co.nz";
message[2]="www.steinhardtcohen.com";

var crowtimer;
var fishtimer;
var bubbletimer;
var companytimer;

var crowpos=0;
var crowmsg = new Array(7);
crowmsg[0]="moo!";
crowmsg[1]="oink!";
crowmsg[2]="baaaaa!";
crowmsg[3]="buk buk buk!";
crowmsg[4]="I am not a lemming.";
crowmsg[5]="I would rather be a live chicken...";
crowmsg[6]="OK, so maybe the sky isn't falling.";

var fishpos=0;
var fishcount=0;
var fishmsg = new Array(1);

fishmsg[0]="Brain food!";
fishmsg[1]="Now where did I put my glasses?"

var fishjumps=60;
var bubblejumps=70;
var count=0;
var maxnum = 3;
var timerspeed = 2;
var ci=0;

function getRandom(min,max)
{
   return ( (Math.round ( Math.random()*(max-min) ) )+min );
}

// write fishover

function writefishbubbles(fieldnum)
{

	if ( fieldnum == null)
		fieldnum = 1;
	if ( fieldnum == 0 )
		fieldnum = 1;
		
	if ( count == 0 )
	{
		document.getElementById('fishbubbles' + fieldnum).style.position = 'relative';
		document.getElementById('fishbubbles' + fieldnum).innerHTML= 'o';
	}
	if ( count< bubblejumps)
	{
			htop = bubblejumps - count;
			document.getElementById('fishbubbles' + fieldnum).style.top = htop + "px";

			count+=3;
			bubbletimer=setTimeout("writefishbubbles('" + fieldnum +"')", (fieldnum*fieldnum)*timerspeed);
	
	} else	{
			document.getElementById('fishbubbles' + fieldnum).innerHTML= "&nbsp;";
			fieldnum++;
			count=0;
			stoptimer(bubbletimer);
			if ( fieldnum > maxnum )
				return;
			writefishbubbles(fieldnum);
	}
	
}

var breakmarks;
var charwidth	= 20;

function setbreakmarks(message)
{
	breakmarks = new Array();
	if ( message == null )
		return;
		
	i = 0; j = 0;
	while ( true ) 
	{
		j = i;
		i +=charwidth;

		if ( message.length <= i)
			break;
			
		for ( ; i>j; i--)
			if ( message.charAt(i)==' ' )
			{
				breakmarks[breakmarks.length] = i;
				document.getElementById('crowtext').innerHTML = i;
				break;
			}
	}
}

var breakindex = 0;
function writefishmsg(field,message)
{

	maxlength=40;
		
	fieldname = field + 'text';

	if ( (fishpos==0) && (fishcount==0 ))
	{
				if (breakmarks.length > 0 )
				{
					breakindex = 0;
					document.getElementById('fishtabledata').style.height = ( (breakmarks.length+1)*24) + 'px';
					document.getElementById('crowtext').innerHTML = document.getElementById('fishtext').style.height;
				}
				document.getElementById(fieldname + '0').innerHTML ="";
				stoptimer(colortimer);				
				document.getElementById(fieldname + '0').style.color = "#000000";
				document.getElementById(fieldname+'0').style.left = 0;
				document.getElementById(fieldname).innerHTML = "";
				document.getElementById(fieldname).style.top = 0;
				document.getElementById(fieldname).style.color="#000000";
	}

	if ( message.charAt(fishpos)=='' )
		fishpos = maxlength;
	
	if (fishpos<maxlength)
	{
		fieldnum = Math.floor( ( (fishpos+1) %4) );
		if ( fishcount < fishjumps )
		{
			if ( message.charAt(fishpos)==' ' )
			{
				if ( ( breakmarks[breakindex]!= null ) &&
				  ( fishpos == breakmarks[breakindex] ) )
					{
						document.getElementById(fieldname).innerHTML+="<br/>";
						breakindex++;
					}
					else	
						document.getElementById(fieldname).innerHTML+= "&nbsp;";
			} else {
				htop = fishjumps - fishcount;
				
				document.getElementById(fieldname+'0').style.position = 'relative';
				document.getElementById(fieldname+'0').style.width = "12px";
				document.getElementById(fieldname+'0').style.top = htop + "px";
				document.getElementById(fieldname+'0').style.left = (fishpos) + "px";
				
				document.getElementById(fieldname+'0').innerHTML= message.charAt(fishpos);
	
				fishcount+=6;
	
				fishtimer=setTimeout("writefishmsg('" + field + "','" + message + "')", 0);
				return;
			}
		}
		document.getElementById(fieldname).innerHTML+=document.getElementById(fieldname+'0').innerHTML;
		document.getElementById(fieldname+'0').innerHTML="";
		fishpos++;
		fishcount=0;
		fishtimer=setTimeout("writefishmsg('" + field + "','" + message + "')", 0);

	}		
	if ( fishpos == maxlength )
	{
		fadetext('fishtext');
		stoptimer(fishtimer);
		fishpos=0;
		writefishbubbles(1);
		fishcount=0;
	}

}

function writefish()
{
	if ( (fishpos==0)&&(fishcount==0) )
	{
		stoptimer(fishtimer);
		value = getRandom(0,fishmsg.length-1);
		setbreakmarks(fishmsg[value]);
		writefishmsg('fish', fishmsg[value]);
	} else {
		writefishbubbles();
	}
		
}
				
// end write fishover
var rarmimage = new Array(3);
rarmimage[1] = "images/monkeyarmr1.gif";
rarmimage[2] = "images/monkeyarmr2.gif";
rarmimage[3] = "images/monkeyarmr3.gif";

var larmimage = new Array(3);
larmimage[1] = "images/monkeyarml1.gif";
larmimage[2] = "images/monkeyarml2.gif";
larmimage[3] = "images/monkeyarml3.gif";

var faceimage = new Array(4);
faceimage[0] = "images/monkey2.gif";
faceimage[1] = "images/monkey3.gif";
faceimage[2] = "images/monkey2.gif";
faceimage[3] = "images/monkey1.gif";

var faceblink = new Array(4);
faceblink[0] = "images/monkeyblink1.gif";
faceblink[1] = "images/monkeyblink2.gif";
faceblink[2] = "images/monkeyblink1.gif";
faceblink[3] = "images/monkeyblink2.gif";
faceblink[4] = "images/monkeyblink1.gif";
faceblink[5] = "images/monkey4.gif";

var rightarmpos=2;
var leftarmpos=3;
var rightarmtimer;
var leftarmtimer;
var maxstrokes = 30;
var winkstrokes = 10;

// start monkey animation

function animatemonkeyarms()
{
	document.getElementById("monkeyface").src="images/monkey4.gif";
	animateleft(0);
	animateright(0);
}

function winkmonkeyface(facenum)
{
	document.getElementById("monkeyface").src=faceimage[facenum];
	facenum++;
	if ( facenum == faceimage.length )
	{
		stoptimer(facetimer);
		facenum=0;
		return;
	}
	facetimer=setTimeout("winkmonkeyface(" + facenum + ")", 500);
}

function blinkmonkeyface(facenum)
{
	document.getElementById("monkeyface").src=faceblink[facenum];
	facenum++;
	if ( facenum == faceblink.length )
	{
		stoptimer(facetimer);
		facenum=0;
		return;
	}
	facetimer=setTimeout("blinkmonkeyface(" + facenum + ")", 300);
}
		
var inc=1;
function animateright(strokes)
{
	document.getElementById('monkeyarmright').src=rarmimage[rightarmpos];
	value = getRandom(1,5);
	strokes++;
	if (rightarmpos == (rarmimage.length-1) )
		inc = -1;
	else if ( rightarmpos == 1 )
		inc = 1;
		
	rightarmpos += inc;

	if ( strokes < maxstrokes )
	{
		if ( strokes == (winkstrokes) )
			winkmonkeyface(0);
		rightarmtimer=setTimeout("animateright(" + strokes + ")", value*50);
	}
		
	else {
		stoptimer(rightarmtimer);
	}
}

function animateleft(strokes)
{
	document.getElementById('monkeyarmleft').src=larmimage[leftarmpos];
	value = getRandom(1,5);
	strokes++;
	if (leftarmpos == (larmimage.length-1) )
		inc = -1;
	else if ( leftarmpos == 1 )
		inc = 1;
		
	leftarmpos += inc;
	if ( strokes < maxstrokes )
		leftarmtimer=setTimeout("animateleft(" + strokes + ")", value*75);
		
	else {
		stoptimer(leftarmtimer);
		blinkmonkeyface(0);
	}
}
	
			

// start crowmessage
function openmouth()
{
	
	document.getElementById('fowl').src="images/fowlopen.gif"
	writecrow();
}

function closemouth()
{
	document.getElementById('fowl').src="images/fowl.gif"
	stoptimer(crowtimer);
}

var crowvalue = 0;

function writecrow()
{
// only change the message if we've printed all of the last message.
  if ( crowpos == 0 )
		crowvalue = getRandom(0,crowmsg.length-1);
  		
	writecrowmsg('crow', crowmsg[crowvalue]);
}

function writecrowmsg(field, message)
{
		fieldname = field + 'text';
		if (crowpos==0) {
			document.getElementById(fieldname).innerHTML="";
			stoptimer(colortimer);
			document.getElementById(fieldname).style.color = "#000000";
		}
		
		maxlength=message.length;
		if (crowpos<maxlength)
		{
			document.getElementById(fieldname).style.position = 'relative';
//			document.getElementById(fieldname).style.top = "60px";
			document.getElementById(fieldname).innerHTML +=message.charAt(crowpos);

			crowpos++;
			crowtimer=setTimeout('writecrowmsg("' + field + '","' + message + '")', 50)
		}
		
		if ( crowpos==maxlength )
		{
			stoptimer(crowtimer);
			crowpos=0;
			fadetext('crowtext');
		}
		
}

// end crow message

var rainbowcolors = new Array(	
		"#660099"/*violet*/,
		"#660099"/*violet*/,
		"#330099"/*indigo*/,
		"#330099"/*indigo*/,
		"#0066FF"/*blue*/,
		"#0066FF"/*blue*/,
		"#00FF66"/*green*/,
		"#00FF66"/*green*/,
		"#FFFF33"/*yellow*/,
		"#FFFF33"/*yellow*/,
		"#FF6633"/*orange*/,
		"#FF6633"/*orange*/,
		"#FF0000"/*red*/,
		"#FF0000"/*red*/,
		"#000000"/*black*/);


var companyname = "Art &amp; Edifice";


function rainbowcompanyname(coloredpos)
{
	colornum=0;
	posdec = coloredpos;

//set the tail to black, if there is one
	for ( i=posdec; i<companyname.length; i++)
	{
		character = document.getElementById('character' + i);
		if (character!=null)
			character.style.color = rainbowcolors[rainbowcolors.length-1];
	 }
		

	//back up through a hanging tail, if there is one
  while ( posdec >companyname.length)
	{
		posdec--;
		colornum++;
	}
	posdec--;
	
	i = posdec;

	// set the colored characters
	while ( i>=0 )
	{
		if ( colornum == rainbowcolors.length )
			colornum--;

		document.getElementById('character' + (i)).style.color = rainbowcolors[colornum];
		colornum++;
			
		i--;
	}
	coloredpos++;
	
	if ( coloredpos < (companyname.length+rainbowcolors.length) )
	{
		companytimer=setTimeout("rainbowcompanyname(" + coloredpos + ")", 50);
		return;
	}
}

function flipcompanyname()
{
	coloredpos=1;
	rainbowcompanyname(coloredpos);
}
	
// start companyname animation
/*
function flipcompanyname()
{
	if (ci<32)
	{
			document.getElementById('company').src="images/company" + ci +".gif"
			companytimer=setTimeout("flipcompanyname()", 50)
			ci++;
	}
	if ( ci == 32 )
	{
		stoptimer(companytimer);
		ci=0;
	}
}
*/
// end companyname animation

function stoptimer(timer)
{
	if ( timer != null )
		clearTimeout(timer)
}

function startcontact()
{
		contacttimer = setTimeout("writecontact()",1000);
}

function writecontact()
{
	document.getElementById('contact').innerHTML='<a href="' + 'mail' + 'to:bonnie' + String.fromCharCode(64) + 'bonnified.com' + '">' + 'Bonnified Software' + '</a>';
}
//-->

/*
				<a href="http://validator.w3.org/check?uri=referer"><img
						src="http://www.w3.org/Icons/valid-xhtml10"
						alt="Valid XHTML 1.0!" height="31" width="88" border="0" /></a>
*/
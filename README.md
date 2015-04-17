# Bootstrap Joyride

Bootstrap Joyride is an easy to configure site tour wizard based on [Twitter Boostrap](http://twitter.github.com/bootstrap) and inspired by [Joyride](http://www.zurb.com/playground/jquery-joyride-feature-tour-plugin).

Try live demo at [www.wocodi.com](http://www.wocodi.com).

Bootstrap Joyride is MIT-licensed and absolutely free to use.

## Documentation

Bootstrap Joyride is inspired by [Joyride](http://www.zurb.com/playground/jquery-joyride-feature-tour-plugin) and relies on a similar structure for the tour markup.

### BUGS 
Not really, but still yes :-) Some stuff hardcoded that should be changed. 
Started to rewrite and narrow down the bugs and add more settings. 
Please feel free to contribute.

### Add Bootstrap Joyride to your page

    - Boostrap Tooltip and Popup javascripts needs to be attached 
    <script src="bootstrap-tooltip.js" type="text/javascript"></script>
	<script src="bootstrap-popover.js" type="text/javascript"></script>
	
    - Then attach the Bootstrap Joyride plugin
    <script src="bootstrap-joyride.js" type="text/javascript"></script>

### Define the attach points

	- Bootstrap Joyride can be attached to any element with a unique ID, in any order.
	<h3 id="JoyrideStop1">This is neat</h3>

	<p id="JoyrideStop2">Bla bla bla</p>

	<a id="JoyrideStop3" href="#url">Click me</a>

	<div id="JoyrideStop4">This is my content</div>

### Create Your Joyride Outline

	- Each joyride tour is made in a ol.
	- The joyride is in the order of the li's

	<ol id="JoyrideCourseID">
	  <li data-target="#JoyrideStop1" data-placement="bottom" data-title="First Stop">Joyride content...</li>
	  <li data-target="#JoyrideStop2" data-placement="top" data-title="Second Stop">Joyride content...</li>
	  <li data-target="#JoyrideStop3" data-placement="left" data-title="Third Stop">Joyride content...</li>
	  <li data-target="#JoyrideStop4" data-placement="right" data-title="Fourth Stop">Joyride content...</li>
	</ol>

### Activate the Joyride

	- Lauch the Joyride on pageload

	<script type="text/javascript">
	  $(window).load(function() {
	    $(this).bootJoyride({
	      /* Settings will go here */
	    });
	  });
	</script>

	
	- Lauch the Joyride on a button click.
	
	<a href="#joyride" id="startride" class="btn btn-large btn-danger"><span class="icon-bullhorn"></span>Start Joyride</a>

	$('#startride').click(function (e) {
    e.preventDefault();
	    $(this).bootJoyride({
	      'cookieMonster': false,           	// true/false for whether cookies are used
	      'cookieName': 'myHomepageJoyride',  	// choose your own cookie name
	      'cookieDomain': false,           		// set to false or yoursite.com
	      'tipContent': '#JoyrideCourseID',    	// The ID of the <ol> used for content
	      'postRideCallback': $.noop,      		// A method to call once the tour closes
	      'postStepCallback': $.noop,      		// A method to call after each step
	      'nextOnClose': false,            		// If cookies are enabled, increment the current step on close
	      'debug': false
	    });
    });

    
    - Lauch the Joyride on a button click with modal.

	<style>
   	#overlay {
	    	position: fixed; 
		    top: 0;
		    left: 0;
		    width: 100%;
		    height: 100%;
		    background: #000;
		    opacity: 0.4;
		    filter: alpha(opacity=40);
		    z-index: 10;
		    display: none;
		}
   	</style>

	<div id='overlay'></div>

	<a href="#joyride" id="startride" class="btn btn-large btn-danger"><span class="icon-bullhorn"></span>Start Joyride</a>


	$('#startride').click(function (e) {
    	e.preventDefault();
	    $('#overlay').show();
		    $(this).bootJoyride({
		      'cookieMonster': false,           	// true/false for whether cookies are used
		      'cookieName': 'myHomepageJoyride',  	// choose your own cookie name
		      'cookieDomain': false,           		// set to false or yoursite.com
		      'tipContent': '#JoyrideCourseID',    	// The ID of the <ol> used for content
		      'postRideCallback': endride,      	// A method to call once the tour closes
		      'postStepCallback': $.noop,      		// A method to call after each step
		      'nextOnClose': false,            		// If cookies are enabled, increment the current step on close
		      'debug': false
		    });
    });

    function endride() 
    {
    	$('#overlay').hide();
    }

### Methods
#### .bootJoyride('stop')
To stop Joyride at anytime. Similar to the close button on popover.

	$(this).bootJoyride('stop')

#### .bootJoyride('restart')
To restart Joyride from current step at anytime.

	$(this).bootJoyride('restart')

### Options / Settings

	- Set your settings to override the defaults

	$(this).bootJoyride({
	  'cookieMonster': true,           		// true/false for whether cookies are used
	  'cookieName': 'myHomepageJoyride',  	// choose your own cookie name
	  'cookieDomain': false,           		// set to false or yoursite.com
	  'tipContent': '#JoyrideCourseID',		// The ID of the <ol> used for content
	  'postRideCallback': $.noop,      		// A method to call once the tour closes
      'postStepCallback': $.noop,      		// A method to call after each step
      'nextOnClose': false,            		// If cookies are enabled, increment the current step on close
      'debug': false
	});


## Credits
Orignial Idea and code is from:
Bootstrap-Tour by [GILD](http://www.gild.com).
and [Phantazm](https://github.com/Phantazm/bootstrap-joyride)

Since no active dev i decided to fix the bugs and improve and rebrand it.

## MIT Open Source License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

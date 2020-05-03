$(document).ready(function () {
  'use strict';
  if ($(window).width() > 750) {

    $('#body').each(function () {

      var themeOption = $(`<div class="theme-option">
			<div class="theme-option-switcher">
				<div class="theme-option-switcher-btn theme-icon-option">
					<i class="mdi mdi-settings mdi-spin"></i>
				</div>
					<div class="theme-option-swticher-header">
						<div class="theme-option-switcher-heading">Theme Option</div>
					</div>
          <div class="theme-option-swticher-body">

            <span class="theme-subtitle">Navbar Color</span>
						<div class="no-col-space" >
							<select class="theme-select" id="navbar-color-option">
                <option value="navbar-light">Navbar Light</option>
                <option value="navbar-dark">Navbar Dark</option>
                <option value="navbar-primary">Navbar Primary</option>
                <option value="navbar-transparent">Navbar Transparent</option>
              </select>
						</div>

            <div class="header-button-wrapper">
              <span class="theme-subtitle">Navbar Position</span>
              <div class="no-col-space">
                <a href="javascript:void(0);" class="theme-btn navbar-fixed-to theme-active-switcher-btn">Fixed</a>
                <a href="javascript:void(0);" class="theme-btn navbar-static-to">Static</a>
              </div>
            </div>

            <hr>

            <span class="theme-subtitle mt-5">Sidebar Navigation color</span>
						<div class="no-col-space">
							<a href="#pattern-dark" class="theme-btn theme-active-switcher-btn sidebar-dark-to">Dark</a>
							<a href="#pattern-light" class="theme-btn sidebar-light-to">Light</a>
            </div>

            <div class="pattern-wrapper">

              <ul class="to-list-unstyled" id="pattern-dark">
								<li class="pattern-dark-default pattern-active"></li>
								<li class="pattern-dark-01 pattern1"></li>
								<li class="pattern-dark-02"></li>
								<li class="pattern-dark-03"></li>
								<li class="pattern-dark-04"></li>
							</ul>

              <ul class="to-list-unstyled active" id="pattern-light">
								<li class="pattern-light-default"></li>
								<li class="pattern-light-01"></li>
								<li class="pattern-light-02"></li>
								<li class="pattern-light-03"></li>
								<li class="pattern-light-04"></li>
              </ul>

            </div>

            <span class="theme-subtitle mt-5">Sidebar Navigation Position</span>
						<div class="no-col-space">
							<a href="#sidebar-option-fixed" class="theme-btn theme-active-switcher-btn sidebar-fixed-to">Fixed</a>
              <a href="#sidebar-option-static" class="theme-btn sidebar-static-to">Static</a>
            </div>

            <span class="theme-subtitle">Sidebar Navigation Style</span>
            <div class="theme-select-wrapper mb-5">
              <select class="theme-select select-sidebar-position active" id="sidebar-option-fixed">
                <option value="sidebar-fixed">Expanded</option>
                <option value="sidebar-fixed-minified">Minified</option>
                <option value="sidebar-fixed-offcanvas">Offcanvas</option>
              </select>

              <select class="theme-select select-sidebar-position" id="sidebar-option-static">
                <option value="sidebar-static">Expanded</option>
                <option value="sidebar-static-minified">Minified</option>
                <option value="sidebar-static-offcanvas">Offcanvas</option>
              </select>
            </div>

            <hr>

            <span class="theme-subtitle">Direction</span>
						<div class="no-col-space">
							<a href="javascript:void(0);" class="theme-btn theme-active-switcher-btn ltr-to">LTR</a>
							<a href="javascript:void(0);" class="theme-btn rtl-to">RTL</a>
            </div>
          </div>
          <div style="display: flex; justify-content: center; padding-top: 30px">
            <div id="reset-options" style="width: auto; cursor: pointer" class="theme-btn theme-active-switcher-btn">Reset Settings</div>
          </div>
			</div>
		</div>`);
      $('#body').prepend(themeOption);
    });
  }

  //Option Switcher

  // Store object for local storage data
  var currentOptions = {
    headerType: "navbar-fixed",
    headerBackground: "navbar-light",
    navigationType: "sidebar-fixed",
    navigationBackground: "sidebar-dark",
    direction: "ltr",
  }

  /**
   * Get local storage value
   */
  function getOptions() {
    return JSON.parse(localStorage.getItem("optionsObject"))
  }

  /**
   * Set local storage property value
   */
  function setOptions(sendObj) {

    //Store in local storage
    var optionsCopy = Object.assign(currentOptions, sendObj);

    //Store in local storage
    localStorage.setItem("optionsObject", JSON.stringify(optionsCopy));
  }

  if (getOptions() != null) {
    currentOptions = getOptions()
  } else {
    localStorage.setItem("optionsObject", JSON.stringify(currentOptions));
  }

  /**
   * Clear local storage
   */
  function clearOptions() {
    localStorage.removeItem("optionsObject");
  }

  // Set localstorage value to variable
  if (getOptions() != null) {
    currentOptions = getOptions()
  } else {
    localStorage.setItem("optionsObject", JSON.stringify(currentOptions));
  }

  $('.theme-option-switcher-btn').on('click', function () {

    $(this).toggleClass('theme-cross');
    jQuery('.theme-option-switcher').toggleClass('theme-option-visible');
  });

  //VARIABLE
  var body = jQuery('#body');
  var navbar_static_btn = jQuery('.navbar-static-to');
  var header_fixed_btn = jQuery('.navbar-fixed-to');
  var navbar = jQuery('#navbar');
  var sidebar = jQuery('#left-sidebar');



  /*====== NAVBAR POSITION ======*/

  // Navbar Static
  navbar_static_btn.click(function () {
    jQuery(this).addClass('theme-active-switcher-btn');
    header_fixed_btn.removeClass('theme-active-switcher-btn');
    body.removeClass('navbar-fixed');
    body.addClass('navbar-static');

    //Store in local storage
    setOptions({ headerType: "navbar-static" });
  });

  //Current options for header static
  if (currentOptions.headerType === "navbar-static") {
    navbar_static_btn.trigger("click");
  }

  // Navbar Fixed
  header_fixed_btn.click(function () {
    jQuery(this).addClass('theme-active-switcher-btn');
    navbar_static_btn.removeClass('theme-active-switcher-btn');
    body.removeClass('navbar-static');
    body.addClass('navbar-fixed');
    //Store in local storage
    setOptions({ headerType: "navbar-fixed" });
  });

  //Current options for header fixed
  if (currentOptions.headerType === "navbar-fixed") {
    header_fixed_btn.trigger("click");
  }

  /*====== NAVBAR COLOR ======*/
  if ($(window).width() > 750) {
    $('#navbar-color-option').on('change', function () {

      var optionSelected = $(this).find("option:selected");
      var valueSelected = optionSelected.val();

      if (valueSelected === 'navbar-light') {
        navbar.removeClass('navbar-dark navbar-transparent navbar-primary').addClass('navbar-light');

        //Store in local storage
        setOptions({ headerBackground: "navbar-light" });

      }
      if (valueSelected === 'navbar-dark') {
        navbar.removeClass('navbar-light navbar-transparent navbar-primary').addClass('navbar-dark');

        //Store in local storage
        setOptions({ headerBackground: "navbar-dark" });
      }

      if (valueSelected === 'navbar-primary') {
        navbar.removeClass('navbar-light navbar-transparent').addClass('navbar-primary');

        //Store in local storage
        setOptions({ headerBackground: "navbar-primary" });
      }

      if (valueSelected === 'navbar-transparent') {
        navbar.removeClass('navbar-dark navbar-light navbar-primary').addClass('navbar-transparent');

        //Store in local storage
        setOptions({ headerBackground: "navbar-transparent" });
      }
    });

    //Current options for header light
    if (currentOptions.headerBackground === "navbar-light") {
      $('#navbar-color-option').val('navbar-light').change();
    }

    //Current options for header dark
    if (currentOptions.headerBackground === "navbar-dark") {
      $('#navbar-color-option').val('navbar-dark').change();
    }

    //Current options for header primary
    if (currentOptions.headerBackground === "navbar-primary") {
      $('#navbar-color-option').val('navbar-primary').change();
    }

    //Current options for header transparent
    if (currentOptions.headerBackground === "navbar-transparent") {
      $('#navbar-color-option').val('navbar-transparent').change();

    }

  }

  // SIDEBAR OPTION

  var sidebar_fixed_btn = $('.sidebar-fixed-to');
  var sidebar_static_btn = $('.sidebar-static-to');
  var sidebar_fixed = $('#sidebar-option-fixed');
  var sidebar_static = $('#sidebar-option-static');

  /*====== SIDEBAR FIXED BUTTON ======*/
  sidebar_fixed_btn.click(function (e) {
    e.preventDefault();

    jQuery(this).addClass('theme-active-switcher-btn');
    sidebar_static_btn.removeClass('theme-active-switcher-btn');

    body.removeClass('sidebar-fixed-offcanvas sidebar-static sidebar-static-offcanvas sidebar-collapse sidebar-collapse-out sidebar-minified sidebar-minified-out').addClass('sidebar-fixed');

    if ($(this).attr("href") === '#sidebar-option-fixed') {
      sidebar_static.removeClass('active');
      sidebar_fixed.addClass('active');
    }

    sidebar_fixed.val('sidebar-fixed').trigger('change');

    // Store in local storage
    setOptions({ navigationType: "sidebar-fixed" });
  });

  /*====== Sidebar Static Button ======*/
  sidebar_static_btn.click(function (e) {
    e.preventDefault();

    jQuery(this).addClass('theme-active-switcher-btn');

    sidebar_fixed_btn.removeClass('theme-active-switcher-btn');

    body.removeClass('sidebar-fixed-offcanvas sidebar-static-offcanvas sidebar-collapse sidebar-collapse-out sidebar-minified-out sidebar-fixed sidebar-minified').addClass('sidebar-static')

    if ($(this).attr("href") === '#sidebar-option-static') {
      sidebar_fixed.removeClass('active');
      sidebar_static.addClass('active');

    }

    sidebar_static.val('sidebar-static').trigger('change');

    //Store in local storage
    setOptions({ navigationType: "sidebar-static" });
  });

  /*====== Sidebar Fixed / Static Option ======*/
  if ($(window).width() > 750) {

    // Sidebar Fixed
    sidebar_fixed.change(function () {
      var optionSelected = $(this).find("option:selected");
      var valueSelected = optionSelected.val();

      if (valueSelected === "sidebar-fixed") {
        sidebar_fixed_btn.addClass('theme-active-switcher-btn');
        sidebar_static_btn.removeClass('theme-active-switcher-btn');

        body.removeClass('sidebar-fixed-offcanvas sidebar-static sidebar-static-offcanvas sidebar-collapse sidebar-collapse-out sidebar-minified sidebar-minified-out').addClass('sidebar-fixed')
        window.isMinified = false; // Because It is not minified (aka it is opened)
        window.isCollapsed = false;

        //Store in local storage
        setOptions({ navigationType: "sidebar-fixed" });
      }

      if (valueSelected === "sidebar-fixed-minified") {
        sidebar_fixed_btn.addClass('theme-active-switcher-btn');
        sidebar_static_btn.removeClass('theme-active-switcher-btn');

        body.removeClass('sidebar-fixed-offcanvas sidebar-static sidebar-static-offcanvas sidebar-collapse sidebar-collapse-out sidebar-minified-out').addClass('sidebar-fixed sidebar-minified')
        window.isMinified = true; // Because It is  minified
        window.isCollapsed = false;

        //Store in local storage
        setOptions({ navigationType: "sidebar-fixed-minified" });
      }

      if (valueSelected === "sidebar-fixed-offcanvas") {

        sidebar_fixed_btn.addClass('theme-active-switcher-btn');
        sidebar_static_btn.removeClass('theme-active-switcher-btn');

        body.removeClass('sidebar-static sidebar-static-offcanvas sidebar-collapse-out sidebar-minified sidebar-minified-out sidebar-fixed').addClass('sidebar-fixed-offcanvas sidebar-collapse')
        window.isCollapsed = true;
        window.isMinified = false;

        //Store in local storage
        setOptions({ navigationType: "sidebar-fixed-offcanvas" });
      }

    });

    // Current options of sidebar fixed
    if (currentOptions.navigationType === "sidebar-fixed") {
      sidebar_fixed.val('sidebar-fixed').change();
      sidebar_static.removeClass('active');
      sidebar_fixed.addClass('active');
    }

    // Current options of sidebar fixed minified
    if (currentOptions.navigationType === "sidebar-fixed-minified") {
      sidebar_fixed.val('sidebar-fixed-minified').change();
      sidebar_static.removeClass('active');
      sidebar_fixed.addClass('active');
    }

    // Current options of sidebar fixed offcanvas
    if (currentOptions.navigationType === "sidebar-fixed-offcanvas") {
      sidebar_fixed.val('sidebar-fixed-offcanvas').change();
      sidebar_static.removeClass('active');
      sidebar_fixed.addClass('active');
    }

    // Sidebar Static
    sidebar_static.change(function () {
      var optionSelected = $(this).find("option:selected");
      var valueSelected = optionSelected.val();

      if (valueSelected === "sidebar-static") {

        sidebar_static_btn.addClass('theme-active-switcher-btn');
        sidebar_fixed_btn.removeClass('theme-active-switcher-btn');

        body.removeClass('sidebar-fixed-offcanvas sidebar-static-offcanvas sidebar-collapse sidebar-collapse-out sidebar-minified-out sidebar-fixed sidebar-minified').addClass('sidebar-static')
        window.isMinified = false;
        window.isCollapsed = false;

        //Store in local storage
        setOptions({ navigationType: "sidebar-static" });
      }

      if (valueSelected === "sidebar-static-minified") {

        sidebar_static_btn.addClass('theme-active-switcher-btn');
        sidebar_fixed_btn.removeClass('theme-active-switcher-btn');

        body.removeClass('sidebar-fixed-offcanvas sidebar-static-offcanvas sidebar-collapse sidebar-collapse-out sidebar-minified-out sidebar-fixed').addClass('sidebar-static sidebar-minified')
        window.isMinified = true;
        window.isCollapsed = false;

        //Store in local storage
        setOptions({ navigationType: "sidebar-static-minified" });
      }

      if (valueSelected === "sidebar-static-offcanvas") {

        sidebar_static_btn.addClass('theme-active-switcher-btn');
        sidebar_fixed_btn.removeClass('theme-active-switcher-btn');

        body.removeClass('sidebar-fixed-offcanvas sidebar-static sidebar-collapse-out sidebar-minified sidebar-minified-out sidebar-fixed').addClass('sidebar-static-offcanvas sidebar-collapse');
        window.isCollapsed = true;
        window.isMinified = false;

        //Store in local storage
        setOptions({ navigationType: "sidebar-static-offcanvas" });
      }
    });

    // Current options of sidebar static
    if (currentOptions.navigationType === "sidebar-static") {
      sidebar_static.val('sidebar-static').change();
      sidebar_fixed.removeClass('active');
      sidebar_static.addClass('active');
    }

    // Current options of sidebar static minified
    if (currentOptions.navigationType === "sidebar-static-minified") {
      sidebar_static.val('sidebar-static-minified').change();
      sidebar_fixed.removeClass('active');
      sidebar_static.addClass('active');
    }

    // Current options of sidebar static offcanvas
    if (currentOptions.navigationType === "sidebar-static-offcanvas") {
      sidebar_static.val('sidebar-static-offcanvas').change();
      sidebar_fixed.removeClass('active');
      sidebar_static.addClass('active');
    }

  }


  // Variabl Pattern Dark
  var pattern_dark_li       = jQuery('#pattern-dark li');
  var pattern_dark_default  = jQuery('.pattern-dark-default');
  var pattern_dark_1        = jQuery('.pattern-dark-01');
  var pattern_dark_2        = jQuery('.pattern-dark-02');
  var pattern_dark_3        = jQuery('.pattern-dark-03');
  var pattern_dark_4        = jQuery('.pattern-dark-04');

  // Variabl Pattern Light
  var pattern_light_li      = jQuery('#pattern-light li');
  var pattern_light_default = jQuery('.pattern-light-default');
  var pattern_light_1       = jQuery('.pattern-light-01');
  var pattern_light_2       = jQuery('.pattern-light-02');
  var pattern_light_3       = jQuery('.pattern-light-03');
  var pattern_light_4       = jQuery('.pattern-light-04');

  // Sidebar Background
  var sidebar_dark = jQuery('.sidebar-dark-to');
  var sidebar_light = jQuery('.sidebar-light-to');
  var dark_box = jQuery('#pattern-dark');
  var light_box = jQuery('#pattern-light');

  sidebar_dark.click(function (e) {
    e.preventDefault();
    jQuery(this).addClass('theme-active-switcher-btn');
    sidebar_light.removeClass('theme-active-switcher-btn');

    sidebar.removeClass('sidebar-light').addClass('sidebar-dark');
    sidebar.removeAttr('style');

    pattern_dark_li.removeClass('pattern-active');
    pattern_dark_default.addClass('pattern-active');

    if (jQuery(this).attr("href") === '#pattern-dark'){
      light_box.removeClass('active');
      dark_box.addClass('active');

    }
    setOptions({ navigationBackground: "sidebar-dark" });

  });

  // Current options of sidebar dark
  if (currentOptions.navigationBackground === "sidebar-dark" ) {
    sidebar_dark.trigger("click")
  }

  sidebar_light.click(function (e) {
    e.preventDefault();
    jQuery(this).addClass('theme-active-switcher-btn');
    sidebar_dark.removeClass('theme-active-switcher-btn');

    sidebar.removeClass('sidebar-dark').addClass('sidebar-light');

    sidebar.removeAttr('style');

    pattern_light_li.removeClass('pattern-active');
    pattern_light_default.addClass('pattern-active');

    if (jQuery(this).attr("href") === '#pattern-light') {
      dark_box.removeClass('active');
      light_box.addClass('active');

    }
    setOptions({ navigationBackground: "sidebar-light" });

  });

  // Current options of sidebar light
  if (currentOptions.navigationBackground === "sidebar-light") {
    sidebar_light.trigger("click")
  }


  /*====================== PATTERN DARK =======================*/

  //Click Pattern Dark Default
  pattern_dark_default.click(function () {
    pattern_dark_li.removeClass('pattern-active');
    pattern_dark_default.addClass('pattern-active');
    sidebar.removeAttr('style');

    setOptions({ sidebarBgPattern: "sidebar-dark"});
  });

  // Current options of sidebar pattern dark default
  if (currentOptions.sidebarBgPattern === "sidebar-dark") {
    pattern_dark_default.trigger("click");
  }

  //Click Pattern Dark 01
  pattern_dark_1.click(function () {
    pattern_dark_li.removeClass('pattern-active')
    pattern_dark_1.addClass('pattern-active');
    sidebar.attr('style', 'background-image:url("../assets/img/sidebar/sidebar-bg-04.jpg")');

    setOptions({ sidebarBgPattern: "pattern-dark-01" });

  });

  // Current options of sidebar pattern dark 01
  if (currentOptions.sidebarBgPattern === "pattern-dark-01") {
    pattern_dark_1.trigger("click");
  }

  //Click Pattern Dark 02
  pattern_dark_2.click(function () {
    pattern_dark_li.removeClass('pattern-active');
    pattern_dark_2.addClass('pattern-active');
    sidebar.attr('style', 'background-image:url("../assets/img/sidebar/sidebar-bg-01.jpg")');

    setOptions({ sidebarBgPattern: "pattern-dark-02" });
  });

  // Current options of sidebar pattern dark 02
  if (currentOptions.sidebarBgPattern === "pattern-dark-02") {
    pattern_dark_2.trigger("click");
  }

  pattern_dark_3.click(function () {
    pattern_dark_li.removeClass('pattern-active');
    pattern_dark_3.addClass('pattern-active');
    sidebar.attr('style', 'background-image:url("../assets/img/sidebar/sidebar-bg-03.jpg")');

    setOptions({ sidebarBgPattern: "pattern-dark-03" });
  });

  // Current options of sidebar pattern dark 03
  if (currentOptions.sidebarBgPattern === "pattern-dark-03") {
    pattern_dark_3.trigger("click");
  }

  pattern_dark_4.click(function () {
    pattern_dark_li.removeClass('pattern-active');
    pattern_dark_4.addClass('pattern-active');
    sidebar.attr('style', 'background-image:url("../assets/img/sidebar/sidebar-bg-05.jpg")');

    setOptions({ sidebarBgPattern: "pattern-dark-04" });
  });

  // Current options of sidebar pattern dark 04
  if (currentOptions.sidebarBgPattern === "pattern-dark-04") {
    pattern_dark_4.trigger("click");
  }

  /*====================== PATTERN LIGHT =======================*/

  pattern_light_default.click(function () {
    pattern_light_li.removeClass('pattern-active');
    pattern_light_default.addClass('pattern-active');
    sidebar.removeAttr('style');

    setOptions({ sidebarBgPattern: "sidebar-light" });
  });

  // Current options of sidebar pattern light default
  if (currentOptions.sidebarBgPattern === "sidebar-light") {
    pattern_light_default.trigger("click");
  }

  pattern_light_1.click(function () {
    pattern_light_li.removeClass('pattern-active');
    pattern_light_1.addClass('pattern-active');
    sidebar.attr('style', 'background-image:url("../assets/img/sidebar/sidebar-bg-04.jpg")');

    setOptions({ sidebarBgPattern: "pattern-light-01" });
  });

  // Current options of sidebar pattern light 01
  if (currentOptions.sidebarBgPattern === "pattern-light-01") {
    pattern_light_1.trigger("click");
  }

  pattern_light_2.click(function () {
    pattern_light_li.removeClass('pattern-active');
    pattern_light_2.addClass('pattern-active');
    sidebar.attr('style', 'background-image:url("../assets/img/sidebar/sidebar-bg-01.jpg")');

    setOptions({ sidebarBgPattern: "pattern-light-02" });
  });

  // Current options of sidebar pattern light 02
  if (currentOptions.sidebarBgPattern === "pattern-light-02") {
    pattern_light_2.trigger("click");
  }

  pattern_light_3.click(function () {
    pattern_light_li.removeClass('pattern-active');
    pattern_light_3.addClass('pattern-active');

    sidebar.attr('style', 'background-image:url("../assets/img/sidebar/sidebar-bg-02.jpg")');

    setOptions({ sidebarBgPattern: "pattern-light-03" });
  });

  // Current options of sidebar pattern light 03
  if (currentOptions.sidebarBgPattern === "pattern-light-03") {
    pattern_light_3.trigger("click");
  }

  pattern_light_4.click(function () {
    pattern_light_li.removeClass('pattern-active');
    pattern_light_4.addClass('pattern-active');

    sidebar.attr('style', 'background-image:url("../assets/img/sidebar/sidebar-bg-01.jpg")');

    setOptions({ sidebarBgPattern: "pattern-light-04" });
  });

  // Current options of sidebar pattern light 04
  if (currentOptions.sidebarBgPattern === "pattern-light-04") {
    pattern_light_4.trigger("click");
  }


  // Direction
  var ltr = jQuery('.ltr-to');
  var rtl = jQuery('.rtl-to');

  ltr.click(function () {

    jQuery(this).addClass('theme-active-switcher-btn');
    rtl.removeClass('theme-active-switcher-btn');
    $('html').attr('dir', 'ltr')
    $("#main-css-href").attr("href", "assets/css/mono.css");
    window.dir = 'ltr'

    //Store in local storage
    setOptions({ direction: "ltr"});
  });

  //Click for current options
  if (currentOptions.direction === "ltr") {
    ltr.trigger("click")
  }

  rtl.click(function () {

    jQuery(this).addClass('theme-active-switcher-btn');
    ltr.removeClass('theme-active-switcher-btn');
    $('html').attr('dir', 'rtl')
    $("#main-css-href").attr("href", "assets/css/mono.rtl.css");
    window.dir = 'rtl'

    //Store in local storage
    setOptions({ direction: "rtl" })
  });

  //Click for current options
  if (currentOptions.direction === "rtl") {
    rtl.trigger("click")
  }

  $('#reset-options').click(function () {
    clearOptions();
    location.reload();
  });

});


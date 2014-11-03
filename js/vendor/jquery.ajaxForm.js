/*
 * ajaxForm
 *
 * Validate and send a form asynchronously
 * @author Jonathan Roy <jroy@optimumweb.ca>
 * @version 2.1
 * @package wpboilerplate
 */

$(function() {

    "use strict"; // jshint ;_;

    jQuery.fn.ajaxForm = function() {

        return this.each(function() {

            // define form elements
            var $form = $(this);
            var $formFields = $form.find('.fields');
            var $formSuccess = $form.find('.success');
            var $formError = $form.find('.error');
            var $formWarning = $form.find('.warning');
            var $formLoading = $form.find('.loading');

            // define form properties
            var formId = $form.attr('id');
            var formAction = $form.attr('action');
            var formMethod = $form.attr('method');
            var formEnctype = $form.attr('enctype');

            // hide response messages and loading
            $formSuccess.hide();
            $formWarning.hide();
            $formError.hide();
            $formLoading.hide();

            // track form start
            var formStarted = false;
            $formFields.find('input, textarea').keypress(function() {
                if ( !formStarted ) {
                    formStarted = true;
                    $form.addClass('started');
                    // trigger google analytics
                    if ( typeof _gaq != 'undefined' ) {
                        _gaq.push(['_trackEvent', 'AjaxForms', 'Start', formId]);
                    }
                }
            });

            $form.submit(function(e) {

                // prevent default page load
                e.preventDefault();

                $formSuccess.hide();
                $formWarning.hide();
                $formError.hide();

                // show that we are working in the background
                $formLoading.show();

                // assume no errors in submission
                var inputError = false;

                // validation settings
                var validClass = 'valid success';
                var invalidClass = 'invalid error';

                // validate all required fields
                $form.find('.required').each(function() {

                    var $input = $(this);
                    var $group = $input.parents('.control-group').first();

                    if ( $input.val() == '' ) {
                        inputError = true;
                        $input.removeClass( validClass ).addClass( invalidClass );
                        $group.removeClass( validClass ).addClass( invalidClass );
                    }

                    else {
                        $input.removeClass( invalidClass ).addClass( validClass );
                        $group.removeClass( invalidClass ).addClass( validClass );
                    }

                });

                // validate emails
                $form.find('.valid.email, .valid[type="email"]').each(function() {

                    var $input = $(this);

                    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

                    if ( !emailRegex.test( $input.val() ) ) {
                        inputError = true;
                        $input.removeClass( validClass ).addClass( invalidClass ).parents('.control-group').removeClass( validClass ).addClass( invalidClass );
                    }

                    else {
                        $input.removeClass( invalidClass ).addClass( validClass ).parents('.control-group').removeClass( invalidClass ).addClass( validClass );
                    }

                });

                if ( !inputError ) {

                    $form.trigger('valid');

                    $.ajax({
                        type:	     formMethod,
                        url:	     formAction,
                        data:	     $form.serialize(),
                        contentType: formEnctype,
                        statusCode: {
                            200: function() {
                                $formSuccess.fadeIn();
                                $formFields.hide();
                                $form.trigger('success').addClass('sent');
                                // trigger google analytics
                                if ( typeof _gaq != 'undefined' ) {
                                    _gaq.push(['_trackEvent', 'AjaxForms', 'Success', formId]);
                                }
                            },
                            400: function() {
                                $formWarning.fadeIn();
                                $form.trigger('warning');
                                // trigger google analytics
                                if ( typeof _gaq != 'undefined' ) {
                                    _gaq.push(['_trackEvent', 'AjaxForms', 'Warning', formId]);
                                }
                            },
                            500: function() {
                                $form.trigger('error');
                                $formError.fadeIn();
                                // trigger google analytics
                                if ( typeof _gaq != 'undefined' ) {
                                    _gaq.push(['_trackEvent', 'AjaxForms', 'Error', formId]);
                                }
                            }
                        }
                    });

                }

                else {
                    $form.trigger('invalid');
                    $formSuccess.hide();
                    $formWarning.fadeIn();
                    $formError.error();
                }

                // hide the loading
                $formLoading.hide();

            });

            // show that the form is ajax-enabled
            $form.trigger('enabled').addClass('ajax-enabled');

        });
    };

});
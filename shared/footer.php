<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
<script src="js/plugins.js"></script>
<script src="js/vendor/jquery.ajaxForm.js"></script>
<script src="js/vendor/jquery.placeholder.js"></script>
<script src="js/main.js"></script>

<?php if ( defined('GA_ID') ) : ?>
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', '<?php echo GA_ID; ?>', '<?php echo GA_PROPERTY; ?>');
    ga('send', 'pageview');
</script>
<?php endif; ?>

<?php if ( defined('GOOGLE_CONVERSION_ID') ) : ?>
<script type="text/javascript">
    /* <![CDATA[ */
    var google_conversion_id = <?php echo GOOGLE_CONVERSION_ID; ?>;
    var google_custom_params = window.google_tag_params;
    var google_remarketing_only = true;
    /* ]]> */
</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"></script>
<noscript><div style="display:inline;"><img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/970835238/?value=0&amp;guid=ON&amp;script=0"/></div></noscript>
<?php endif; ?>

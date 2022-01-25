    ( function ( $ ) {
        jQuery.fn.orbit = function(s, options){
            var settings = {
                            orbits:    1     // Number of times to go round the orbit e.g. 0.5 = half an orbit
                           ,period:    3000  // Number of milliseconds to complete one orbit.
                           ,maxfps:    25    // Maximum number of frames per second. Too small gives "flicker", too large uses lots of CPU power
                           ,clockwise: true  // Direction of rotation.
            };
            $.extend(settings, options);  // Merge the supplied options with the default settings.
        
            return(this.each(function(){
                var p        = $(this);

/* First obtain the respective positions */

                var p_top    = p.css('top'),
                    p_left   = p.css('left'),
                    s_top    = s.css('top'),
                    s_left   = s.css('left');

/* Then get the positions of the centres of the objects */

                var p_x      = parseInt(p_top ) + p.height()/2,
                    p_y      = parseInt(p_left) + p.width ()/2,
                    s_x      = parseInt(s_top ) + s.height()/2,
                    s_y      = parseInt(s_left) + s.width ()/2;

/* Find the Adjacent and Opposite sides of the right-angled triangle */
                var a        = s_x - p_x,
                    o        = s_y - p_y;

/* Calculate the hypotenuse (radius) and the angle separating the objects */

                var r        = Math.sqrt(a*a + o*o);
                var theta    = Math.acos(a / r);
                
/* Calculate the number of iterations to call setTimeout(), the delay and the "delta" angle to add/subtract */

                var niters   = Math.ceil(Math.min(4 * r, settings.period, 0.001 * settings.period * settings.maxfps));
                var delta    = 2*Math.PI / niters;
                var delay    = settings.period  / niters;
                if (! settings.clockwise) {delta = -delta;}
                niters      *= settings.orbits;

/* create the "timeout_loop function to do the work */

                var timeout_loop = function(s, r, theta, delta, iter, niters, delay, settings){
                    setTimeout(function(){

/* Calculate the new position for the orbiting element */

                        var w = theta + iter * delta;
                        var a = r * Math.cos(w);
                        var o = r * Math.sin(w);
                        var x = parseInt(s.css('left')) + (s.height()/2) - a;
                        var y = parseInt(s.css('top' )) + (s.width ()/2) - o;

/* Set the CSS properties "top" and "left" to move the object to its new position */

                        p.css({top:  (y - p.height()/2),
                               left: (x - p.width ()/2)});

/* Call the timeout_loop function if we have not yet done all the iterations */

                        if (iter < (niters - 1))  timeout_loop(s, r, theta, delta, iter+1, niters, delay, settings);
                    }, delay);
                };

/* Call the timeout_loop function */

                timeout_loop(s, r, theta, delta, 0, niters, delay, settings);
            }));
        }
    }) (jQuery);
    
    $('#mercury').orbit($('#sun'  ), {orbits:  8, period:  2000});
    $('#venus'  ).orbit($('#sun'  ), {orbits:  4, period:  4000});
    $('#earth'  ).orbit($('#sun'  ), {orbits:  2, period:  8000}).css({backgroundColor: '#ccffcc'});
    $('#moon'   ).orbit($('#earth'), {orbits: 32, period:   500, maxfps: 20, clockwise: false});       
    $('#mars'   ).orbit($('#sun'  ), {orbits:  1, period: 16000});

// Delay animation for specified time.
setTimeout(function() {

    // Start animating.
    interval = setInterval(function() {

        // Increment step or finish animation.
        if (step > steps) {
            clearInterval(interval);
            return;
        } else {
            step++;
        }

        // Move each circle to its new position.
        for (var i = 0; i < circleCount; i++) {
            var circle = circles[i],
                newAngle = Math.easeOutQuad(
                    step,
                    circle.startAngle,
                    circle.rotateThrough,
                    steps
                );

            // Update circle angle.
            circle.currentAngle = newAngle;
            setCircleAngle(circle.element, newAngle);
        }

    }, intervalMs);

}, startAfterMs);

// Set the angle of one of the circle elements.
function setCircleAngle(circle, angle) {
    var x = pathRadius * Math.cos(angle * Math.PI / 180),
        y = pathRadius * Math.sin(angle * Math.PI / 180);

    circle.style.top = (x - circleRadius) + 'px';
    circle.style.left = (y - circleRadius) + 'px';
};

Math.easeOutQuad = function (t, b, c, d) {
    t /= d;
    return -c * t*(t-2) + 
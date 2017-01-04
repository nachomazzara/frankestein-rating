import React from 'react'
import ReactDOM from 'react-dom'
import RatingContainer from 'containers/Rating/RatingContainer'

if (typeof jQuery !== 'undefined') {
    (function ($) {
        var pluginName = "rater",
          defaults = {
              value: 0
          };

        function Plugin(element, options) {
            this.element = element;
            this.settings = $.extend({}, defaults, options);
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
        }

        $.extend(Plugin.prototype, {
            init: function () {
                var settings = this.settings
                this.component = ReactDOM.render(
                    <RatingContainer
                      course={settings.course}
                      lectureID={settings.lectureID}
                      email={settings.email}
                      successMessage={settings.successMessage}
                      zap={settings.zap}
                      title={settings.title}
                      commentLabel={settings.commentLabel} />,
                    this.element
                );
                return this;
            },

            val: function (val) {
                if (!arguments.length) {
                    return this.component.state.counter;
                }else{
                    this.settings.value = val;
                    this.init();
                }
            }
        });

        $.fn[pluginName] = function (options) {
            return this.map(function () {
                if (!$.data(this, 'plugin_'+pluginName)) {
                    $.data(this, 'plugin_'+pluginName, new Plugin(this, options));
                }
                return $.data(this, 'plugin_'+pluginName);
            });
        };
    })(jQuery);
}

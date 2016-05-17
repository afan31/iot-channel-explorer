// hiding all the data divs initially
$('#automatedDataContent').hide();
$('#mostRecentData').hide();
$('.validCustomPanel').hide();
$('.errorCustomPanel').hide();
$('#channelinfomanual').hide();
$('#channelinfoautomated').hide();
$('#channelinfogetdata').hide();
$("#error-message").hide();

// setting up the table headers for the automated data display
var automatedHeaderContent = '<tr>';
var $automatedDataContent = $("#automatedDataContent");
automatedHeaderContent += "<th>Entry Id</th><th>Field Value</th>";
$automatedDataContent.append(automatedHeaderContent);

// call to insert data to the channel every 5 seconds
channelData = setInterval('putDataIntoChannel', 5000);


//set up thingspeak array
var thingspeak = {};
thingspeak['url'] = 'https://api.thingspeak.com';
thingspeak['channel'] = 114928;
thingspeak['read_api_key'] = '36K19EKNTI4Q3LS7';
thingspeak['write_api_key'] = '7BHR9380R6UZSUDZ';
thingspeak['results'] = 5;
thingspeak['field_number'] = 1;

// setting up the default values for the modal
$('#modalChannelId').val(thingspeak['channel']);
$('#modalReadKey').val(thingspeak['read_api_key']);
$('#modalWriteKey').val(thingspeak['write_api_key']);
$('#modalfieldNumber').val(thingspeak['field_number']);

/* code for modal starts */
$("#modalChannelInfo").click(function() {
    // Re-initializing the thingspeak parameters on change of channel params
    thingspeak['channel'] = document.getElementById('modalChannelId').value;
    thingspeak['read_api_key'] = document.getElementById('modalReadKey').value;
    thingspeak['write_api_key'] = document.getElementById('modalWriteKey').value;
    thingspeak['field_number'] = document.getElementById('modalfieldNumber').value;
    //console.log(thingspeak);
    // Re-setting the modal params to channel params
    $('#modalChannelId').val(thingspeak['channel']);
    $('#modalReadKey').val(thingspeak['read_api_key']);
    $('#modalWriteKey').val(thingspeak['write_api_key']);
    $('#modalfieldNumber').val(thingspeak['field_number']);

    // hiding the divs on change of channel settings
    $('#automatedDataContent').hide();
    $('#mostRecentData').hide();
    $('.validCustomPanel').hide();
    $('.errorCustomPanel').hide();
    $('#channelinfomanual').hide();
    $('#channelinfoautomated').hide();
    $('#channelinfogetdata').hide();
    $("#error-message").hide();

    // Resetting the automated data content on change of channel params
    $('#automatedDataContent').empty();
    var automatedHeaderContent = '<tr>';
    var $automatedDataContent = $("#automatedDataContent");
    automatedHeaderContent += "<th>Entry Id</th><th>Field Value</th>";
    $automatedDataContent.append(automatedHeaderContent);
    // Resetting the play button on change of channel params
    if ($('#start').find(".glyphicon").hasClass("glyphicon-pause")) {
        // show play button state
        $('#start').find(".glyphicon").removeClass("glyphicon-pause").addClass("glyphicon-play");
        clearInterval(channelData);
    }
});
/* code for modal ends */

/* code for getting top 5 data starts */
$("#getData").click(function() {
    $('#channelinfogetdata').show();
    $('#mostRecentData').empty();
    $('#mostRecentData').show();
    var headerContent = '<tr>';
    var $mostRecentData = $("#mostRecentData");
    headerContent += "<th>Created</th><th>Entry Id</th><th>Field value</th>";
    $mostRecentData.append(headerContent);

    // get the data with a webservice call
    $.getJSON(thingspeak['url'] + '/channels/' + $('#modalChannelId').val() + '/fields/' + $('#modalfieldNumber').val() + '.json?results=' + thingspeak['results'] +
        '&location=' + thingspeak['location'] + '&status=' + thingspeak['status'] + '&api_key=' + $('#modalReadKey').val(),
        function(data) {
            // create table and headers if channel object exists
            if (data) {
                console.log(data);
                $('#channelidgetdata').html('<b>' + data.channel.id + '</b>');
                $('#channelnamegetdata').html('<b>' + data.channel.name + '</b>');
            }
            if (data.feeds) {
                $.each(data.feeds, function(i, feed) {
                    var tableContent = '<tr>';
                    var fNumber = $('#modalfieldNumber').val();
                    var $mostRecentData = $("#mostRecentData");

                    tableContent += "<td><time class='timeago' datetime='" + feed.created_at + "'>" + feed.created_at + "</time></td>" + "<td>" + feed.entry_id + "</td>";
                    // setting the correct field label
                    if (fNumber == 1) {
                        tableContent += "<td>" + feed.field1 + "</td>";
                        $('#fieldnamegetdata').html('<b>' + data.channel.field1 + '</b>');
                    }
                    if (fNumber == 2) {
                        tableContent += "<td>" + feed.field2 + "</td>";
                        $('#fieldnamegetdata').html('<b>' + data.channel.field2 + '</b>');
                    }
                    if (fNumber == 3) {
                        tableContent += "<td>" + feed.field3 + "</td>";
                        $('#fieldnamegetdata').html('<b>' + data.channel.field3 + '</b>');
                    }
                    if (fNumber == 4) {
                        tableContent += "<td>" + feed.field4 + "</td>";
                        $('#fieldnamegetdata').html('<b>' + data.channel.field4 + '</b>');
                    }
                    if (fNumber == 5) {
                        tableContent += "<td>" + feed.field5 + "</td>";
                        $('#fieldnamegetdata').html('<b>' + data.channel.field5 + '</b>');
                    }
                    if (fNumber == 6) {
                        tableContent += "<td>" + feed.field6 + "</td>";
                        $('#fieldnamegetdata').html('<b>' + data.channel.field6 + '</b>');
                    }
                    if (fNumber == 7) {
                        tableContent += "<td>" + feed.field7 + "</td>";
                        $('#fieldnamegetdata').html('<b>' + data.channel.field7 + '</b>');
                    }
                    if (fNumber == 8) {
                        tableContent += "<td>" + feed.field8 + "</td>";
                        $('#fieldnamegetdata').html('<b>' + data.channel.field8 + '</b>');
                    }
                    $mostRecentData.append(tableContent);
                    // console.log(feed);
                    // loading timeago plugin in the DOM
                    $("time.timeago").timeago();
                });
            }
        });
});
/* code for getting top 5 data ends */

/* code for putting data every 15 seconds into the channel starts */
function putDataIntoChannel() {
    $('#channelinfoautomated').show();
    $('#automatedDataContent').show();
    $('#errorContent').show();
    var tableContent = '<tr>';
    var inputData = Math.floor((Math.random() * 1000) + 1);
    
    $.getJSON(thingspeak['url'] + '/channels/' + $('#modalChannelId').val() + '/fields/' + $('#modalfieldNumber').val() + '.json?results=' + thingspeak['results'] + '&location=' +
        thingspeak['location'] + '&status=' + thingspeak['status'] + '&api_key=' + $('#modalReadKey').val(),
        function(data) {
            // create table and headers if channel object exists
            if (data) {
                //console.log(data);
                $('#channelidautomated').html('<b>' + data.channel.id + '</b>');
                $('#channelnameautomated').html('<b>' + data.channel.name + '</b>');
                // setting the correct field label
                var fNumber = $('#modalfieldNumber').val();
                if (fNumber == 1) {
                    $('#fieldnameautomated').html('<b>' + data.channel.field1 + '</b>');
                }
                if (fNumber == 2) {
                    $('#fieldnameautomated').html('<b>' + data.channel.field2 + '</b>');
                }
                if (fNumber == 3) {
                    $('#fieldnameautomated').html('<b>' + data.channel.field3 + '</b>');
                }
                if (fNumber == 4) {
                    $('#fieldnameautomated').html('<b>' + data.channel.field4 + '</b>');
                }
                if (fNumber == 5) {
                    $('#fieldnameautomated').html('<b>' + data.channel.field5 + '</b>');
                }
                if (fNumber == 6) {
                    $('#fieldnameautomated').html('<b>' + data.channel.field6 + '</b>');
                }
                if (fNumber == 7) {
                    $('#fieldnameautomated').html('<b>' + data.channel.field7 + '</b>');
                }
                if (fNumber == 8) {
                    $('#fieldnameautomated').html('<b>' + data.channel.field8 + '</b>');
                }
            }
        });
    $.ajax({
        url: 'https://api.thingspeak.com/update?api_key=' + $('#modalWriteKey').val() + '&field' + $('#modalfieldNumber').val() + '=' + inputData,
        dataType: "text",
        success: function(data) {
            if (data != 0) {
                var $automatedDataContent = $("#automatedDataContent");
                tableContent += "<td>" + data + "</td>" + "<td>" + inputData + "</td>";
                $automatedDataContent.append(tableContent);
            }
        },
        error: function() {
            alert('failure');
        }
    });
}
/* code for putting data every 15 seconds into the channel ends */

/* code for putting data manually into the channel starts */
$("#manualInputButton").click(function(event) {
    event.preventDefault();
    if (document.getElementById('manualInputVal').value === "") {
        $("#error-message").slideDown(function() {
            setTimeout(function() {
                $("#error-message").slideUp();
            }, 1500);
        });
    } else {
        $('#channelinfomanual').show();
        $.getJSON(thingspeak['url'] + '/channels/' + $('#modalChannelId').val() + '/fields/' + $('#modalfieldNumber').val() + '.json?results=' + thingspeak['results'] +
            '&location=' + thingspeak['location'] + '&status=' + thingspeak['status'] + '&api_key=' + $('#modalReadKey').val(),
            function(data) {
                // create table and headers if channel object exists
                if (data) {
                    console.log(data);
                    $('#channelidmanual').html('<b>' + data.channel.id + '</b>');
                    $('#channelnamemanual').html('<b>' + data.channel.name + '</b>');
                    var fNumber = $('#modalfieldNumber').val();
                    if (fNumber == 1) {
                        $('#fieldnamemanual').html('<b>' + data.channel.field1 + '</b>');
                    }
                    if (fNumber == 2) {
                        $('#fieldnamemanual').html('<b>' + data.channel.field2 + '</b>');
                    }
                    if (fNumber == 3) {
                        $('#fieldnamemanual').html('<b>' + data.channel.field3 + '</b>');
                    }
                    if (fNumber == 4) {
                        $('#fieldnamemanual').html('<b>' + data.channel.field4 + '</b>');
                    }
                    if (fNumber == 5) {
                        $('#fieldnamemanual').html('<b>' + data.channel.field5 + '</b>');
                    }
                    if (fNumber == 6) {
                        $('#fieldnamemanual').html('<b>' + data.channel.field6 + '</b>');
                    }
                    if (fNumber == 7) {
                        $('#fieldnamemanual').html('<b>' + data.channel.field7 + '</b>');
                    }
                    if (fNumber == 8) {
                        tableContent += "<td>" + feed.field8 + "</td>";
                        $('#fieldnamemanual').html('<b>' + data.channel.field8 + '</b>');
                    }
                }
            });
        $.ajax({
            url: 'https://api.thingspeak.com/update?api_key=' + $('#modalWriteKey').val() + '&field' + $('#modalfieldNumber').val() + '=' + document.getElementById('manualInputVal').value,
            dataType: "text",
            success: function(data) {
                if (data != 0) {
                    $('#customMainContent').empty();
                    $('.validCustomPanel').show();
                    $('.errorCustomPanel').hide();
                    var $customMainContent = $("#customMainContent");
                    $customMainContent.append('<b>Entry Id:  </b>' + data + '<br>');
                    $customMainContent.append('<b>Value:  </b>' + document.getElementById('manualInputVal').value);
                    document.getElementById('manualInputVal').value = null;
                } else {
                    $('#customErrorContent').empty();
                    $('.errorCustomPanel').show();
                    $('.validCustomPanel').hide();
                    var $customErrorContent = $("#customErrorContent");
                    $customErrorContent.append(data);
                    document.getElementById('manualInputVal').value = null;
                }
            },
            error: function() {}
        });
    }
});
/* code for putting data manually into the channel starts */

// start / stop updates
function playPause(button) {
    // switch button state and start or stop updates
    if ($(button).find(".glyphicon").hasClass("glyphicon-pause")) {
        // show play button state
        $(button).find(".glyphicon").removeClass("glyphicon-pause").addClass("glyphicon-play");
        // update params
        // stop updates
        clearInterval(channelData);
    } else {
        // show pause button state
        $(button).find(".glyphicon").removeClass("glyphicon-play").addClass("glyphicon-pause");
        // start updates
        putDataIntoChannel();
        // check for new updates
        channelData = setInterval('putDataIntoChannel()', 5000);
    }
}


// code for flash message
(function($) {
    $.fn.flash_message = function(options) {
        options = $.extend({
            text: 'Done',
            time: 1500,
            how: 'before',
            class_name: ''
        }, options);
        return $(this).each(function() {
            if ($(this).parent().find('.flash_message').get(0))
                return;
            var message = $('<span />', {
                'class': 'flash_message ' + options.class_name,
                text: options.text
            }).hide().fadeIn('slow');
            $(this)[options.how](message);
            message.delay(options.time).fadeOut('normal', function() {
                $(this).remove();
            });
        });
    };
})(jQuery);

$('.btn-flash').click(function() {
    $('#status-area').flash_message({
        text: 'Channel Changes Updated Succesfully!',
        how: 'append'
    });
});
var openmrs = openmrs || {};
openmrs.htmlformentry = openmrs.htmlformentry || {};

openmrs.htmlformentry.updateObsDateTime = function(id, dateval) {
    $j("#"+id+" input[type='checkbox']").each(function(idx,e) {
        var newval = dateval;
        if ($j(this).is(':checked') === false) {
            newval = "";
        }
        $j("#"+id+" input[onclick='showCalendar(this)']").each(function(idx,e) {
            $j(this).val(newval);
        });
    });
}

//
// This function initializes a set of obs tags that are rendered as 
// checkboxes (usually coded concept answers) to all be bound to a single
// obs.datetime widget.
//
openmrs.htmlformentry.initDetachedObsDatetime = function(obsDatetimeId,obsCheckboxIds) {
    // Bind the obs.datetime widget we're using.
    $j("#"+obsDatetimeId).change(function() {
        var newdate = $j("#"+obsDatetimeId).val();
        for (var i = 0; i < obsCheckboxIds.length; i++) {
            openmrs.htmlformentry.updateObsDateTime(obsCheckboxIds[i], newdate);
        }
    });
    // Bind the individual checkboxes
    for (var i = 0; i < obsCheckboxIds.length; i++) {
        $j("#"+obsCheckboxIds[i]+" input[type='checkbox']").change(function() {
            var newdate = $j("#"+obsDatetimeId).val();
            for (var i = 0; i < obsCheckboxIds.length; i++) {
                openmrs.htmlformentry.updateObsDateTime(obsCheckboxIds[i], newdate);
            }
        });
    }
    // Do an initial run through in case we're loading a previous encounter.

    // Do an initial check for errors in case we're in an encounter.
    
};

$j(document).ready(function() {
    openmrs.htmlformentry.initDetachedObsDatetime("combinedDate",["pos7381","neg7381"]);
});

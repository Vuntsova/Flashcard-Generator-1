// BasicCard constructor

exports.BasicCard = function (front, back) {
    this.front = front;
    this.back = back;
};




// ClozeCard constructor

exports.ClozeCard = function (text, cloze) {

    var textToLower = text.toLowerCase();
    var clozeToLower = cloze.toLowerCase();

    if (!textToLower.includes(clozeToLower)) {
        console.log("Error");
        return;
    }
        this.full = text;
        this.partial = text.replace(cloze, '...');
        this.cloze = cloze;

};


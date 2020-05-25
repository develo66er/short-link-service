const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    links: [{  
        original_url:String,
        shorted_url: String,
        clicks:Number
      }],
    currentShort: String
});
userSchema.methods.addLink = function (obj){
    const url = obj.url;
    const linksIndex = this.links.findIndex(link => {
        return link.original_url === url;
    });
    let newClicks = 1;
    const updatedLinks = [...this.links];

    if (linksIndex >= 0) {
        newClicks = this.links[linksIndex].clicks + 1;
        updatedLinks[linksIndex].clicks = newClicks;
        this.currentShort = this.links[linksIndex].shorted_url;

    } else {
        const shorted_url = nanoid(7);
        this.currentShort = shorted_url;
        updatedLinks.push({
            original_url: url,
            shorted_url: shorted_url,
            clicks: newClicks
        });
    }

    this.links = updatedLinks;
    this.save();
    return this.currentShort;
};
userSchema.methods.getLink  =function(obj){
    const short = obj.short_link;
    const link = this.links.find(link => {
        return link.shorted_url === short;
    });
    if(link)return link.original_url;
    else return undefined;
}
module.exports = mongoose.model('Users', userSchema);


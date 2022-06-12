const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id:        { type: Number,},
    name:       { type: String, require: true, maxlength: 255 },
    description:{ type: String, default: '', maxlength: 600 },
    image:      { type: String, default: '', maxlength: 255 },
    videoId:    { type: String, require: true, maxlength: 255 },
    level:      { type: String, default: '', maxlength: 255 },
    slug:       { type: String, slug: 'name', unique: true},
}, {
    _id: false,
    timestamps: true,
});

// Custom query helpers
CourseSchema.query.sorttable = function(req)
{
    if(req.query.hasOwnProperty('_sort'))
    {
      const isValidType = ['asc', 'desc'].includes(req.query.type);
      return this.sort({
        [req.query.column]: isValidType ? req.query.type: 'desc',
      });
    }
    return this;
}

// Add plugin
mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', CourseSchema);

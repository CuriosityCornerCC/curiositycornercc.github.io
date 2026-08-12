import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'curiositycornercc/curiositycornercc.github.io',
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        pubDate: fields.date({ label: 'Publish Date' }),
        updatedDate: fields.date({ label: 'Updated Date' }),
        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Date Nights', value: 'Date Nights' },
            { label: 'Grooming & Lifestyle', value: 'Grooming' },
            { label: 'Recipes', value: 'Recipes' },
            { label: 'Travel', value: 'Travel' },
            { label: 'General', value: 'General' },
          ],
          defaultValue: 'General',
        }),
        featured: fields.checkbox({ label: 'Featured Post', defaultValue: false }),
        location: fields.object({
          name: fields.text({ label: 'Business / Place Name' }),
          category: fields.text({ label: 'Category (e.g. Restaurant, Pottery Studio)' }),
          rating: fields.number({ label: 'Google Rating (e.g. 4.2)', validation: { min: 0, max: 5 } }),
          reviewsCount: fields.number({ label: 'Number of Reviews (e.g. 142)' }),
          address: fields.text({ label: 'Address' }),
          locatedIn: fields.text({ label: 'Located In (e.g. Action Arena)' }),
          phone: fields.text({ label: 'Phone Number' }),
          website: fields.text({ label: 'Business Website URL' }),
          menu: fields.text({ label: 'Menu URL or Domain' }),
          hours: fields.text({ label: 'Hours (e.g. Open · Closes 9 PM)' }),
          serviceOptions: fields.array(
            fields.text({ label: 'Service Option' }),
            { label: 'Service Options (e.g. Outdoor seating, Fireplace)', itemLabel: props => props.value }
          ),
          googleMapsUrl: fields.text({ label: 'Google Maps Directions URL' }),
          mapEmbedUrl: fields.text({ label: 'Google Maps Embed iframe URL' }),
        }, {
          label: 'Google Business / Location Information (Optional)',
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
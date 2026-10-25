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
        type: fields.select({
          label: 'Post Type',
          options: [
            { label: 'Article', value: 'article' },
            { label: 'Recipe', value: 'recipe' },
          ],
          defaultValue: 'article',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        pubDate: fields.date({ label: 'Publish Date' }),
        updatedDate: fields.date({ label: 'Updated Date' }),
        image: fields.image({
          label: 'Cover Image',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        author: fields.text({ label: 'Author', defaultValue: 'Curiosity Corner' }),
        category: fields.text({ label: 'Category', defaultValue: 'General' }),
        featured: fields.checkbox({ label: 'Featured Post', defaultValue: false }),
        
        // Location schema block
        location: fields.object({
          name: fields.text({ label: 'Business Name' }),
          category: fields.text({ label: 'Category (e.g. Restaurant, Pottery Studio)' }),
          rating: fields.number({ label: 'Rating (e.g. 4.2)' }),
          reviewsCount: fields.number({ label: 'Review Count' }),
          address: fields.text({ label: 'Address' }),
          locatedIn: fields.text({ label: 'Located In' }),
          phone: fields.text({ label: 'Phone' }),
          website: fields.text({ label: 'Website URL' }),
          menu: fields.text({ label: 'Menu Link/Domain' }),
          hours: fields.text({ label: 'Hours' }),
          serviceOptions: fields.array(
            fields.text({ label: 'Service Option' }),
            { label: 'Service Options', itemLabel: props => props.value }
          ),
          googleMapsUrl: fields.text({ label: 'Google Maps Directions Link' }),
          mapEmbedUrl: fields.text({ label: 'Google Maps Embed iframe URL' }),
        }, {
          label: 'Google Business Location Info (Optional)',
        }),

        // Recipe fields
        servings: fields.text({ label: 'Servings' }),
        totalCalories: fields.text({ label: 'Total Calories' }),
        prepTime: fields.text({ label: 'Prep Time' }),
        cookTime: fields.text({ label: 'Cook Time' }),
        ingredients: fields.array(fields.text({ label: 'Ingredient' }), {
          label: 'Ingredients',
          itemLabel: props => props.value,
        }),
        instructions: fields.array(fields.text({ label: 'Instruction' }), {
          label: 'Instructions',
          itemLabel: props => props.value,
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),

    cheekyCherubs: collection({
      label: 'Cheeky Cherubs Products',
      slugField: 'title',
      path: 'src/content/cheeky-cherubs/*/',
      format: { contentField: 'content' }, // This ensures it saves as an .md file
      schema: {
        title: fields.slug({ 
          name: { label: 'Product Title' } 
        }),
        shortDescription: fields.text({ 
          label: 'Short Description', 
          multiline: true 
        }),
        price: fields.text({ 
          label: 'Price (e.g., $19.99)' 
        }),
        productCode: fields.text({ 
          label: 'Product Code' 
        }),
        image: fields.image({
          label: 'Product Image',
          directory: 'public/images/cheeky-cherubs',
          publicPath: '/images/cheeky-cherubs/'
        }),
        // The content field acts as the body of your .md file
        content: fields.document({
          label: 'Detailed Product Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),


  },
});
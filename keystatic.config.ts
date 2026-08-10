import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        type: fields.select({
          label: 'Page Type',
          options: [
            { label: 'Blog Article', value: 'article' },
            { label: 'Recipe', value: 'recipe' },
          ],
          defaultValue: 'article',
        }),
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description', multiline: true }),
        pubDate: fields.date({ label: 'Published Date' }),
        image: fields.text({ label: 'Cover Image URL' }),
        category: fields.text({ label: 'Category' }),
        servings: fields.integer({ label: 'Servings' }),
        totalCalories: fields.integer({ label: 'Total Calories' }),
        prepTime: fields.text({ label: 'Prep Time' }),
        cookTime: fields.text({ label: 'Cook Time' }),
        ingredients: fields.array(fields.text({ label: 'Ingredient' }), {
          label: 'Ingredients',
          itemLabel: (props) => props.value,
        }),
        instructions: fields.array(fields.text({ label: 'Step' }), {
          label: 'Instructions',
          itemLabel: (props) => props.value,
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
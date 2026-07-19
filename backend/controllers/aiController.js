const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.reviewBlog = async (req, res) => {
  try {
    const { title, content, action } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: 'Title and content are required'
      });
    }

    if (!['suggest', 'correct'].includes(action)) {
      return res.status(400).json({
        error: 'Invalid AI action'
      });
    }

    let instructions;

    if (action === 'correct') {
      instructions = `
Correct the grammar, spelling, punctuation, clarity, and readability
of the following blog post.

Preserve the author's meaning and writing style.
Do not add unsupported facts.

Return only the corrected blog content.
Do not include explanations, headings, or quotation marks.
`;
    } else {
      instructions = `
Review the following blog post and provide concise suggestions.

Focus on:
- title quality
- clarity
- grammar
- structure
- readability
- reader engagement

Return a short bullet list.
Do not rewrite the complete blog.
`;
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
      instructions,
      input: `Title: ${title}\n\nContent:\n${content}`,
      store: false
    });

    res.json({
      result: response.output_text
    });
  } catch (error) {
    console.error('AI review error:', error);

    res.status(500).json({
      error: 'Unable to process the blog with AI'
    });
  }
};
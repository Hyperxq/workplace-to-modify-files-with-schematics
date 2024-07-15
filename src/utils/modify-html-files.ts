import * as cheerio from 'cheerio';
import * as beautify from 'js-beautify';

export function addDivToHtml(fileContent: string): string {
  const $ = cheerio.load(fileContent);

  // Add a new div at the end of the body
  $('body').append('<div class="new-div">New Content</div>');

  // Beautify the resulting HTML
  const modifiedHtml = $.html();

  return beautify.html(modifiedHtml, { indent_size: 2, space_in_empty_paren: true });
}

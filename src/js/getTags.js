import ApiService from './APIservice';
const apiService = new ApiService();
const KEY_STORAGE_TAGS = 'Tags list';

async function getAllTags() {
  const tags = await apiService.getGenres();

  localStorage.setItem(KEY_STORAGE_TAGS, JSON.stringify(tags));

  return await JSON.parse(localStorage.getItem(KEY_STORAGE_TAGS));
}

function getTagsById(tagsId) {
  const tags = JSON.parse(localStorage.getItem(KEY_STORAGE_TAGS));
  let tagsString = '';

  for (const id of tagsId) {
    tags.forEach(tag => {
      if (tag.id === id) {
        tagsString += ' ' + tag.name;
      }
    });
  }
  return tagsString.split(' ').slice(1).join(', ');
}

function checkTags(tags) {
  const tagsWords = tags.split(' ').slice(0, tags.length - 1);

  if (tags.length > 25 || tagsWords.length > 5) {
    const updateText = tagsWords.slice(0, 2);
    updateText.push('Other');
    return updateText.join('');
  }

  return tags;
}

export { getAllTags, checkTags, getTagsById };

functioncleanTags(tags){
    const cleaned = tags.map(tag =>tag.trim().toLowerCase().replace(/[^a-z0-9]/gi, ''));
    const uniqueTags = [...new Set(cleaned)];
    return uniqueTags.join(", ");
}
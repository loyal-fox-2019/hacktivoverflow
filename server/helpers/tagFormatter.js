module.exports = {
  tagFormatter(tags) {
    if (!tags) return
    console.log(tags, '+++++')
    let rawTags = tags.trim().split(',')
    let formattedTags = rawTags.map(tag => {
      return tag.trim().replace(/[`@|=!&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s/g,'')
    })
    formattedTags = Array.from(new Set(formattedTags))
    return formattedTags
  }
}
const containerPadding = (postWidth, widthBetweenPostAndTrending, trendingWidth) => {
    const padding = `calc( ( 100vw - ${ postWidth }px - ${ widthBetweenPostAndTrending }px - ${ trendingWidth }px ) / 2)`;
    return padding;
}

export {
    containerPadding
}
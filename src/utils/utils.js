const ContainerMarginLeft = (postWidth, widthBetweenPostAndTrending, trendingWidth) => {
    const marginLeft = `calc( ( 100vw - ${ postWidth }px - ${ widthBetweenPostAndTrending }px - ${ trendingWidth }px ) / 2)`;
    console.log(marginLeft)
    return marginLeft;
}

const ContainerMarginRight = (postWidth, widthBetweenPostAndTrending, trendingWidth) => {
    const marginLeft = ContainerMarginLeft(postWidth, widthBetweenPostAndTrending, trendingWidth);
    const marginRight = `calc( 100vw - ${marginLeft} - ${postWidth}px )`;
    return marginRight;
}

export {
    ContainerMarginLeft,
    ContainerMarginRight
}
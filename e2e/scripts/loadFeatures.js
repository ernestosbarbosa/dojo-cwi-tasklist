const { getPersonalAccessTokenHandler, WebApi } = require('azure-devops-node-api');
const { writeFileSync } = require('fs');

var workItemId = 2540;
var filePath = './e2e/features/us.feature';
var collectionUrl = "https://ernestosbarbosa.visualstudio.com/";
var token = "mklksktv5aeaglhc6r4q2qpn4z7fsjte4e6ejcqnoskanceuhk2q";
var authHandler = getPersonalAccessTokenHandler(token);
var connect = new WebApi(collectionUrl, authHandler);

async function loadFeatures() {
    let api = await connect.getWorkItemTrackingApi();
    return await api.getWorkItem(workItemId).then(workItem => {
        var str = "#language: en \n" +
            "#encoding: utf-8 \n" +
            "Feature: " + workItem.fields['System.Title'] + "\n" +
            // convertHtmlToText(workItem.fields['AgileTest.Contexto']) + "\n" +
            convertHtmlToText(workItem.fields['AgileTest.BDDCenarios']);
        writeFileSync(filePath, str, "utf8");
    })
}

function convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<br>/gi, "\n");
    returnText = returnText.replace(/<br\s\/>/gi, "\n");
    returnText = returnText.replace(/<br\/>/gi, "\n");
    returnText = returnText.replace(/<\/div>/gi, "\n");
    returnText = returnText.replace(/<p.*>/gi, "\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");
    returnText = returnText.replace(/ +(?= )/g, '');
    returnText = returnText.replace(/&nbsp;/gi, " ");
    returnText = returnText.replace(/&amp;/gi, "&");
    returnText = returnText.replace(/&quot;/gi, '"');
    returnText = returnText.replace(/&lt;/gi, '<');
    returnText = returnText.replace(/&gt;/gi, '>');

    return returnText;
}

loadFeatures();
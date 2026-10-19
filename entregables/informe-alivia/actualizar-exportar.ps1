param([Parameter(Mandatory=$true)][string]$InputDocx,[Parameter(Mandatory=$true)][string]$OutputPdf)
$ErrorActionPreference='Stop'
[Console]::OutputEncoding=[System.Text.UTF8Encoding]::new()
$taskApp=$null;$taskDoc=$null
try {
 $taskApp=New-Object -ComObject Word.Application
 $taskApp.Visible=$false
 $taskDoc=$taskApp.Documents.Open($InputDocx,$false,$false,$false)
 $taskDoc.UpdateStylesOnOpen=$false
 # Los identificadores nativos evitan duplicar estilos TOC por localización de Word.
 foreach($taskStyleId in @(-20,-21,-22,-23,-24,-25,-26,-27,-28,-36)){
  $taskStyle=$taskDoc.Styles.Item($taskStyleId)
  $taskStyle.Font.Name='Times New Roman';$taskStyle.Font.Size=12;$taskStyle.Font.Color=0
  $taskStyle.ParagraphFormat.LineSpacingRule=5;$taskStyle.ParagraphFormat.LineSpacing=13.8
  $taskStyle.ParagraphFormat.SpaceBefore=0;$taskStyle.ParagraphFormat.SpaceAfter=0
  $taskStyle.ParagraphFormat.FirstLineIndent=0
  $taskStyle.ParagraphFormat.KeepWithNext=0
 }
 $taskDoc.Styles.Item(-63).ParagraphFormat.Borders.Enable=0
 for($pass=0;$pass -lt 3;$pass++){
  [void]$taskDoc.Fields.Update();$taskDoc.Repaginate()
  foreach($taskIndex in $taskDoc.TablesOfContents){$taskIndex.Update()}
  foreach($taskIndex in $taskDoc.TablesOfFigures){$taskIndex.Update()}
 }
 $taskDoc.Repaginate();$taskDoc.Save()
 $taskDoc.ExportAsFixedFormat($OutputPdf,17,$false,0,0,1,1,0,$true,$true,1,$true,$true,$false)
 $taskHeadings=@();$taskCaptions=@();$taskIndexes=@()
 foreach($taskP in $taskDoc.Paragraphs){
  $taskText=$taskP.Range.Text.Trim().Replace([char]11,' ')
  if($taskP.OutlineLevel -le 2 -and $taskText){$taskHeadings+=@{Text=$taskText;Page=$taskP.Range.Information(3);Level=$taskP.OutlineLevel}}
  if($taskP.Style.NameLocal -in @('Figure Caption','Table Caption')){$taskCaptions+=@{Text=$taskText;Page=$taskP.Range.Information(3)}}
 }
 foreach($taskIndex in $taskDoc.TablesOfContents){$taskIndexes+=@{Text=$taskIndex.Range.Text;Entries=$taskIndex.Range.Paragraphs.Count;Start=$taskIndex.Range.Start}}
 foreach($taskIndex in $taskDoc.TablesOfFigures){$taskIndexes+=@{Text=$taskIndex.Range.Text;Entries=$taskIndex.Range.Paragraphs.Count;Start=$taskIndex.Range.Start}}
 $taskIndexes=@($taskIndexes | Sort-Object Start)
 @{Pages=$taskDoc.ComputeStatistics(2);Indexes=$taskIndexes;Headings=$taskHeadings;Captions=$taskCaptions}|ConvertTo-Json -Depth 8
} finally {
 if($taskDoc){$taskDoc.Close(0);[void][Runtime.InteropServices.Marshal]::ReleaseComObject($taskDoc)}
 if($taskApp){if($taskApp.Documents.Count -eq 0){$taskApp.Quit()};[void][Runtime.InteropServices.Marshal]::ReleaseComObject($taskApp)}
}
